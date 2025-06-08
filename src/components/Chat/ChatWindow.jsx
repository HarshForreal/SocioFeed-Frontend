// src/components/Chat/ChatWindow.jsx
const ChatWindow = ({ userId }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-4 border-b bg-white shadow-sm">
        <h3 className="text-gray-800 font-semibold">Chat with {userId}</h3>
      </div>

      <div className="flex-1 flex items-center justify-center text-gray-400">
        Message area for user {userId}
      </div>

      <div className="p-4 border-t bg-white">
        <input
          type="text"
          className="w-full border px-4 py-2 rounded-full text-sm outline-none"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
};

export default ChatWindow;

