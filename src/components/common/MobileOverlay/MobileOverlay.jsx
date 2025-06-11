const MobileOverlay = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-50 z-30 ${isOpen ? 'block' : 'hidden'}`}
      onClick={onClose}
    />
  );
};

export default MobileOverlay;
