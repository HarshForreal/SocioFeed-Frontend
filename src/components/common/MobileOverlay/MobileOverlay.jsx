// src/components/common/MobileOverlay.jsx
const MobileOverlay = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${isOpen ? 'block' : 'hidden'}`}
      onClick={onClose}
    />
  );
};

export default MobileOverlay;
