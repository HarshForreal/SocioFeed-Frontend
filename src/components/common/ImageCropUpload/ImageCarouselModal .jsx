import { useState } from 'react';
import { generateOptimizedImageUrl } from '../../../utils/imageUtils';
import Modal from '../Modal/Modal';

const ImageCarouselModal = ({ images, selectedIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div className="flex justify-center items-center relative h-[70vh]">
        <button
          onClick={handlePrev}
          className="absolute left-4 z-10 bg-opacity-50 hover:bg-opacity-70 text-black text-3xl w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label="Previous image"
        >
          &#60;
        </button>

        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={generateOptimizedImageUrl(images[currentIndex])}
            alt={`Image ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain"
            style={{ maxHeight: 'calc(70vh - 4rem)' }}
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 z-10  bg-opacity-50 hover:bg-opacity-70 text-black text-3xl w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200"
          aria-label="Next image"
        >
          &#62;
        </button>
      </div>

      <div className="text-center text-gray-600 py-2">
        {currentIndex + 1} / {images.length}
      </div>
    </Modal>
  );
};

export default ImageCarouselModal;
