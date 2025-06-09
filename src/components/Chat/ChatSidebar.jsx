// src/components/Chat/ChatSidebar.jsx
import { Link, useParams } from 'react-router-dom';

const dummyUsers = [
  { id: '1', username: 'Atharv', avatar: 'https://via.placeholder.com/40' },
  { id: '2', username: 'Jay', avatar: 'https://via.placeholder.com/40' },
  { id: '3', username: 'Aaryan', avatar: 'https://via.placeholder.com/40' },
];

const ChatSidebar = ({ onBack }) => {
  const { userId } = useParams();

  return (
    <div className="p-4 h-full overflow-y-auto bg-white">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      {dummyUsers.map((user) => (
        <Link
          to={`/chat/${user.id}`}
          key={user.id}
          className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-2
            ${userId === user.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          <img
            src={user.avatar}
            alt={user.username}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium text-gray-800">{user.username}</span>
        </Link>
      ))}
      <button
        onClick={onBack}
        className="text-sm text-blue-600 mb-4 hover:underline"
      >
        ← Back
      </button>
    </div>
  );
};

export default ChatSidebar;
