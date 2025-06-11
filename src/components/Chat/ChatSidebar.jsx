import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchFollowingList } from '../../api/user';

const ChatSidebar = ({ onBack }) => {
  const { userId } = useParams();
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    fetchFollowingList()
      .then((following) => setFollowingList(following))
      .catch((err) => {
        console.error('Failed to fetch following list:', err);
        setFollowingList([]);
      });
  }, []);

  return (
    <div className="p-4 h-full overflow-y-auto bg-white">
      <h2 className="text-lg font-semibold mb-4">Messages</h2>
      {followingList.length === 0 ? (
        <p className="text-center text-gray-500">
          You don't follow anyone yet.
        </p>
      ) : (
        followingList.map((user) => (
          <Link
            to={`/chat/${user.id}`}
            key={user.id}
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-2
              ${userId === user.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          >
            <img
              src={user.avatarUrl || 'user'}
              alt={user.username}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-medium text-gray-800">{user.username}</span>
          </Link>
        ))
      )}
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
