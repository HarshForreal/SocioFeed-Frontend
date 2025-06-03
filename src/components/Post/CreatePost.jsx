import { useState } from 'react';
import Modal from '../common/Modal';

const CreatePost = ({ onPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const handlePost = () => {
    if (image && caption.trim()) {
      onPost({ image, caption });
      setIsOpen(false);
      setImage(null);
      setCaption('');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
      >
        Post
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create Post"
        size="md"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        }
      >
        <div className="p-4 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            className="block w-full text-sm text-gray-500"
          />
          <textarea
            rows="3"
            placeholder="Write a caption..."
            className="w-full border rounded-lg p-2 text-sm"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
