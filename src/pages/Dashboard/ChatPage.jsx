// import { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchMessages, sendMessage } from '../../api/chat';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUserProfile } from '../../store/thunks/userThunks';
// import { io } from 'socket.io-client';

// const ChatPage = () => {
//   const { username } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [contactId, setContactId] = useState(null);
//   const messagesEndRef = useRef(null);
//   const socketRef = useRef(null); // Use ref to store socket instance
//   const typingTimeoutRef = useRef(null);

//   const dispatch = useDispatch();
//   const authUser = useSelector((state) => state.auth.user);
//   const contactProfile = useSelector((state) => state.user.profile);

//   // Initialize socket connection once
//   useEffect(() => {
//     if (!authUser?.id) return;

//     socketRef.current = io('http://localhost:5000');
//     socketRef.current.emit('join', authUser.id);

//     socketRef.current.on('receive_message', (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     socketRef.current.on('user_typing', (data) => {
//       if (data.senderId !== authUser.id) {
//         setIsTyping(data.isTyping);
//       }
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.off('receive_message');
//         socketRef.current.off('user_typing');
//         socketRef.current.disconnect();
//       }
//     };
//   }, [authUser?.id]); // Only depend on authUser.id

//   // Fetch contact profile
//   useEffect(() => {
//     if (username && authUser?.id) {
//       dispatch(fetchUserProfile(username));
//     }
//   }, [username, authUser?.id, dispatch]);

//   // Set contactId when profile is loaded
//   useEffect(() => {
//     if (contactProfile?.id) {
//       setContactId(contactProfile.id);
//     }
//   }, [contactProfile?.id]);

//   // Fetch messages when contactId is available
//   useEffect(() => {
//     if (contactId && authUser?.id) {
//       fetchMessages(authUser.id, contactId)
//         .then((data) => {
//           // Ensure all messages have proper structure
//           const formattedMessages = (data || []).map((msg) => ({
//             ...msg,
//             createdAt: msg.createdAt || new Date().toISOString(),
//             id: msg.id || `msg_${Date.now()}_${Math.random()}`,
//           }));
//           setMessages(formattedMessages);
//         })
//         .catch((error) => {
//           console.error('Failed to fetch messages:', error);
//           setMessages([]);
//         });
//     }
//   }, [contactId, authUser?.id]);

//   // Handle typing with debounce
//   useEffect(() => {
//     if (!contactId || !socketRef.current) return;

//     // Clear existing timeout
//     if (typingTimeoutRef.current) {
//       clearTimeout(typingTimeoutRef.current);
//     }

//     // Send typing start
//     if (message.length > 0) {
//       socketRef.current.emit('typing', {
//         senderId: authUser.id,
//         receiverId: contactId,
//         isTyping: true,
//       });

//       // Set timeout to send typing stop
//       typingTimeoutRef.current = setTimeout(() => {
//         socketRef.current.emit('typing', {
//           senderId: authUser.id,
//           receiverId: contactId,
//           isTyping: false,
//         });
//       }, 1000);
//     } else {
//       // Send typing stop immediately
//       socketRef.current.emit('typing', {
//         senderId: authUser.id,
//         receiverId: contactId,
//         isTyping: false,
//       });
//     }

//     return () => {
//       if (typingTimeoutRef.current) {
//         clearTimeout(typingTimeoutRef.current);
//       }
//     };
//   }, [message, contactId, authUser?.id]);

//   const handleSendMessage = () => {
//     if (!message.trim() || !contactId || !socketRef.current) return;

//     const newMessage = {
//       senderId: authUser.id,
//       receiverId: contactId,
//       content: message,
//       createdAt: new Date().toISOString(), // Add timestamp
//       id: Date.now(), // Temporary ID
//     };

//     // Add message to local state immediately for instant display
//     setMessages((prevMessages) => [...prevMessages, newMessage]);

//     // Clear input immediately
//     const messageToSend = message;
//     setMessage('');

//     // Send to server
//     sendMessage({
//       senderId: authUser.id,
//       receiverId: contactId,
//       content: messageToSend,
//     })
//       .then((response) => {
//         // Update the message with server response if needed
//         if (response && response.id) {
//           setMessages((prevMessages) =>
//             prevMessages.map((msg) =>
//               msg.id === newMessage.id
//                 ? { ...msg, id: response.id, createdAt: response.createdAt }
//                 : msg
//             )
//           );
//         }
//         // Emit to socket for real-time delivery
//         socketRef.current.emit('private_message', {
//           ...newMessage,
//           content: messageToSend,
//           id: response?.id || newMessage.id,
//         });
//       })
//       .catch((error) => {
//         console.error('Failed to send message:', error);
//         // Remove the message from local state if sending failed
//         setMessages((prevMessages) =>
//           prevMessages.filter((msg) => msg.id !== newMessage.id)
//         );
//         // Restore the message in input
//         setMessage(messageToSend);
//       });
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   // Auto scroll to bottom
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   if (!authUser?.id) {
//     return <div>Please log in to use chat</div>;
//   }

//   return (
//     <div className="chat-page">
//       <div className="messages-list">
//         {Array.isArray(messages) && messages.length > 0 ? (
//           messages.map((msg, index) => {
//             // Create a unique key using id or fallback to index
//             const messageKey =
//               msg.id || `message_${index}_${msg.senderId}_${msg.createdAt}`;

//             return (
//               <div
//                 key={messageKey}
//                 className={`message ${msg.senderId === authUser.id ? 'sent' : 'received'}`}
//               >
//                 <p>{msg.content}</p>
//                 <span>
//                   {msg.createdAt && !isNaN(new Date(msg.createdAt).getTime())
//                     ? new Date(msg.createdAt).toLocaleTimeString()
//                     : new Date().toLocaleTimeString()}
//                 </span>
//               </div>
//             );
//           })
//         ) : (
//           <p>No messages available</p>
//         )}
//         <div ref={messagesEndRef}></div>
//       </div>

//       {isTyping && <div className="typing-indicator">User is typing...</div>}

//       <div className="send-message">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage } from '../../api/chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../store/thunks/userThunks';
import { io } from 'socket.io-client';
import { Send, MoreVertical } from 'lucide-react'; // Example icons

const ChatPage = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [contactId, setContactId] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const contactProfile = useSelector((state) => state.user.profile); // This is the profile of the user you're chatting with

  // Initialize socket connection once
  useEffect(() => {
    if (!authUser?.id) return;

    socketRef.current = io('http://localhost:5000'); // Ensure this matches your backend socket URL
    socketRef.current.emit('join', authUser.id); // Join with current user's ID

    socketRef.current.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socketRef.current.on('user_typing', (data) => {
      if (contactId && data.senderId === contactId) {
        // Only show typing for the current contact
        setIsTyping(data.isTyping);
      }
    });

    // Handle re-connection (optional, but good for robustness)
    socketRef.current.on('disconnect', () =>
      console.log('Socket disconnected')
    );
    socketRef.current.on('connect', () => console.log('Socket connected'));

    return () => {
      if (socketRef.current) {
        socketRef.current.off('receive_message');
        socketRef.current.off('user_typing');
        socketRef.current.off('disconnect');
        socketRef.current.off('connect');
        socketRef.current.disconnect();
        socketRef.current = null; // Clear ref
      }
    };
  }, [authUser?.id, contactId]); // Added contactId to re-evaluate typing listener if contact changes

  // Fetch contact profile
  useEffect(() => {
    if (username && authUser?.id) {
      // Dispatch fetchUserProfile with the username from params
      dispatch(fetchUserProfile(username));
    }
  }, [username, authUser?.id, dispatch]);

  // Set contactId when profile is loaded
  useEffect(() => {
    if (contactProfile?.id && contactProfile.id !== contactId) {
      // Only update if it's a new contactId
      setContactId(contactProfile.id);
      // Re-fetch messages immediately when contactId changes
      if (authUser?.id) {
        fetchMessages(authUser.id, contactProfile.id)
          .then((data) => {
            const formattedMessages = (data || []).map((msg) => ({
              ...msg,
              createdAt: msg.createdAt || new Date().toISOString(),
              id: msg.id || `msg_${Date.now()}_${Math.random()}`,
            }));
            setMessages(formattedMessages);
          })
          .catch((error) => {
            console.error('Failed to fetch messages on contact change:', error);
            setMessages([]);
          });
      }
    }
  }, [contactProfile?.id, authUser?.id, contactId]); // Depend on contactProfile.id and authUser.id

  // Typing indicator debounce logic
  useEffect(() => {
    if (!contactId || !socketRef.current || !authUser?.id) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (message.length > 0) {
      // Send typing start
      socketRef.current.emit('typing', {
        senderId: authUser.id,
        receiverId: contactId,
        isTyping: true,
      });
      // Set timeout to send typing stop
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit('typing', {
          senderId: authUser.id,
          receiverId: contactId,
          isTyping: false,
        });
      }, 1000);
    } else {
      // Send typing stop immediately if message is empty
      socketRef.current.emit('typing', {
        senderId: authUser.id,
        receiverId: contactId,
        isTyping: false,
      });
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [message, contactId, authUser?.id]);

  const handleSendMessage = async () => {
    if (!message.trim() || !contactId || !authUser?.id || !socketRef.current)
      return;

    const tempMessage = {
      senderId: authUser.id,
      receiverId: contactId,
      content: message.trim(),
      createdAt: new Date().toISOString(),
      id: `temp_${Date.now()}_${Math.random()}`, // Temporary ID for optimistic update
    };

    // Optimistic update: Add message to local state immediately
    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    // Clear input immediately
    const messageToSend = message.trim();
    setMessage('');

    // Send to backend API
    try {
      const response = await sendMessage({
        senderId: authUser.id,
        receiverId: contactId,
        content: messageToSend,
      });

      // Update the temporary message with the real ID and createdAt from the server
      if (response && response.id) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === tempMessage.id
              ? { ...msg, id: response.id, createdAt: response.createdAt }
              : msg
          )
        );
      }

      // Emit to socket for real-time delivery to the other user
      socketRef.current.emit('private_message', {
        ...tempMessage, // Use tempMessage content, but replace ID with server's
        id: response?.id || tempMessage.id,
        createdAt: response?.createdAt || tempMessage.createdAt,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      // Rollback optimistic update: Remove the message from local state if sending failed
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== tempMessage.id)
      );
      // Optionally, restore the message in the input field
      setMessage(messageToSend);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      // Allow Shift+Enter for new lines if desired
      e.preventDefault(); // Prevent default new line behavior
      handleSendMessage();
    }
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!authUser?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Please log in to use chat.</p>
      </div>
    );
  }

  // Display loading state for contact profile
  if (!contactProfile || !contactProfile.id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src={contactProfile.avatarUrl || '/default-avatar.png'}
            alt={contactProfile.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-900 geist">
            {contactProfile.username}
          </h2>
        </div>
        <button className="text-gray-600 hover:text-gray-800">
          <MoreVertical size={24} />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((msg, index) => {
            const isSent = msg.senderId === authUser.id;
            const messageKey =
              msg.id || `message_${index}_${msg.senderId}_${msg.createdAt}`;

            return (
              <div
                key={messageKey}
                className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm relative group
                    ${
                      isSent
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                >
                  <p className="text-sm break-words">{msg.content}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Start a conversation!
          </p>
        )}
        <div ref={messagesEndRef}></div> {/* Scroll target */}
      </div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="px-4 text-sm text-gray-500 pb-2">
          {contactProfile?.username} is typing...
        </div>
      )}

      {/* Message Input Area */}
      <div className="flex items-center p-4 bg-white border-t border-gray-200 gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!contactId} // Disable input if no contact selected
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() || !contactId} // Disable if message is empty or no contact
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
