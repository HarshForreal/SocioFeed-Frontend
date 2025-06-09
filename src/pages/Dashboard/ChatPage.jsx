// src/pages/Dashboard/ChatPage.jsx
import { useParams } from 'react-router-dom';
import ChatSidebar from '../../components/Chat/ChatSidebar';
import ChatWindow from '../../components/Chat/ChatWindow';

const ChatPage = () => {
  const { userId } = useParams(); // dynamically get selected chat user

  return (
    <div className="flex h-screen">
      {/* Chat window (only if a user is selected) */}
      <div className="w-[70%]">
        {userId ? (
          <ChatWindow userId={userId} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500 text-sm">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
