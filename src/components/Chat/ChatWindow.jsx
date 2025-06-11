import { useState, useEffect } from 'react';
import { fetchMessages, sendMessage } from '../../api/chat';

const ChatWindow = ({ userId, contactId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (userId && contactId) {
      fetchMessages(userId, contactId)
        .then((response) => setMessages(response.data))
        .catch((error) => console.error('Error fetching messages:', error));
    }
  }, [userId, contactId]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const messageData = {
      content: newMessage,
      senderId: userId,
      receiverId: contactId,
    };

    sendMessage(messageData)
      .then((response) => {
        setMessages((prevMessages) => [...prevMessages, response.data]);
        setNewMessage('');
      })
      .catch((error) => console.error('Error sending message:', error));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b bg-white shadow-sm">
        <h3 className="text-gray-800 font-semibold">Chat with {contactId}</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet.</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="font-semibold">{message.senderId}</div>
              <div>{message.content}</div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t bg-white">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full border px-4 py-2 rounded-full text-sm outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
