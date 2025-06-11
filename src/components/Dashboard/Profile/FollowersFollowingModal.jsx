import PropTypes from 'prop-types';
import Modal from '../../common/Modal/Modal';
const FollowersFollowingModal = ({
  modalOpen,
  setModalOpen,
  modalTitle,
  modalList,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title={modalTitle}
      size="md"
    >
      {modalList.length === 0 ? (
        <p className="p-4 text-center text-gray-500">
          No {modalTitle.toLowerCase()} found.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {modalList.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded cursor-pointer"
            >
              <img
                src={item.avatarUrl || 'default-avatar.png'}
                alt={item.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{item.username}</p>
                <p className="text-sm text-gray-500">
                  {item.bio || 'No bio available'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

FollowersFollowingModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalList: PropTypes.array.isRequired,
};

export default FollowersFollowingModal;
