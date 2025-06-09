import useUserSearch from '../../hooks/useUserSearch';
import Button from '../../components/common/Button/Button';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const { query, setQuery, users, loading, followingSet, toggleFollow } =
    useUserSearch();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl mb-4 instrument">Scout It Out.</h1>

      <input
        type="text"
        placeholder="Search by username or bio..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading && <p>Loading users...</p>}
      {!loading && users.length === 0 && query !== '' && (
        <p>No users found matching "{query}"</p>
      )}

      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center justify-between py-3 hover:bg-gray-50 rounded px-2"
          >
            <Link
              to={`/profile/${user.username}`}
              className="flex items-center gap-4"
            >
              <img
                src={user.avatarUrl || '/default-avatar.png'}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-600">{user.bio || 'No bio'}</p>
              </div>
            </Link>
            <Button
              text={followingSet.has(user.id) ? 'Unfollow' : 'Follow'}
              color={followingSet.has(user.id) ? 'bg-gray-300' : 'bg-blue-500'}
              textColor={
                followingSet.has(user.id) ? 'text-gray-700' : 'text-white'
              }
              onClick={() => toggleFollow(user.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
