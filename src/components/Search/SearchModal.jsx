import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
import Modal from '../common/Modal/Modal';
const SearchModal = ({
  isOpen,
  onClose,
  users,
  followingSet,
  onToggleFollow,
  title,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      {users.length === 0 ? (
        <p className="p-4 text-center text-gray-500">No users found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.avatarUrl || '/default-avatar.png'}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-gray-500">
                    {user.bio || 'No bio available'}
                  </p>
                </div>
              </div>
              <Button
                text={followingSet.has(user.id) ? 'Unfollow' : 'Follow'}
                color={
                  followingSet.has(user.id) ? 'bg-gray-300' : 'bg-blue-500'
                }
                textColor={
                  followingSet.has(user.id) ? 'text-gray-700' : 'text-white'
                }
                onClick={() => onToggleFollow(user.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

SearchModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  followingSet: PropTypes.instanceOf(Set).isRequired,
  onToggleFollow: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default SearchModal;
