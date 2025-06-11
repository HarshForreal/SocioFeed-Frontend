import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessages, sendMessage } from '../../api/chat';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../store/thunks/userThunks';
import { io } from 'socket.io-client';
import { Send, MoreVertical } from 'lucide-react';

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
  const contactProfile = useSelector((state) => state.user.profile);

  useEffect(() => {
    if (!authUser?.id) return;

    socketRef.current = io('http://localhost:5000');
    socketRef.current.emit('join', authUser.id);

    socketRef.current.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socketRef.current.on('user_typing', (data) => {
      if (contactId && data.senderId === contactId) {
        setIsTyping(data.isTyping);
      }
    });

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
        socketRef.current = null;
      }
    };
  }, [authUser?.id, contactId]);

  useEffect(() => {
    if (username && authUser?.id) {
      dispatch(fetchUserProfile(username));
    }
  }, [username, authUser?.id, dispatch]);

  useEffect(() => {
    if (contactProfile?.id && contactProfile.id !== contactId) {
      setContactId(contactProfile.id);
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
  }, [contactProfile?.id, authUser?.id, contactId]);

  useEffect(() => {
    if (!contactId || !socketRef.current || !authUser?.id) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (message.length > 0) {
      socketRef.current.emit('typing', {
        senderId: authUser.id,
        receiverId: contactId,
        isTyping: true,
      });
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit('typing', {
          senderId: authUser.id,
          receiverId: contactId,
          isTyping: false,
        });
      }, 1000);
    } else {
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
      id: `temp_${Date.now()}_${Math.random()}`,
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    const messageToSend = message.trim();
    setMessage('');

    try {
      const response = await sendMessage({
        senderId: authUser.id,
        receiverId: contactId,
        content: messageToSend,
      });

      if (response && response.id) {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === tempMessage.id
              ? { ...msg, id: response.id, createdAt: response.createdAt }
              : msg
          )
        );
      }

      socketRef.current.emit('private_message', {
        ...tempMessage,
        id: response?.id || tempMessage.id,
        createdAt: response?.createdAt || tempMessage.createdAt,
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== tempMessage.id)
      );
      setMessage(messageToSend);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  if (!contactProfile || !contactProfile.id) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading chat...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
        <div ref={messagesEndRef}></div>
      </div>

      {isTyping && (
        <div className="px-4 text-sm text-gray-500 pb-2">
          {contactProfile?.username} is typing...
        </div>
      )}

      <div className="flex items-center p-4 bg-white border-t border-gray-200 gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          disabled={!contactId}
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim() || !contactId}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
