import React, { useState } from 'react';
import Modal from '../common/Modal/Modal';

const PostUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = () => {
    if (image && caption) {
      onSubmit({ image, caption });
      setImage(null);
      setCaption('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Post" size="md">
      <div className="p-4 space-y-4">
        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        {/* Caption */}
        <textarea
          placeholder="Write a caption..."
          className="w-full p-2 border border-gray-300 rounded-md"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={!image || !caption}
          >
            Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PostUploadModal;
