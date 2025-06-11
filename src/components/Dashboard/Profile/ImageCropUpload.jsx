// components/ImageCropUpload.jsx
import React, { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utils/cropImage';
import PropTypes from 'prop-types';

const ImageCropUpload = ({
  onImageReady,
  onImageRemove,
  aspectRatio = 4 / 5,
  cropShape = 'rect',
  maxImages = 4,
  multiple = true,
  className = '',
}) => {
  const inputRef = useRef();
  const [imageSrcs, setImageSrcs] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [currentCropIndex, setCurrentCropIndex] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('File loaded:', file.name);
        resolve(reader.result);
      };
      reader.onerror = (err) => {
        console.error('FileReader error:', err);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files).slice(0, maxImages);
    const urls = await Promise.all(files.map(readFile));
    setImageSrcs(urls);
    setCroppedImages(Array(urls.length).fill(null));
    setCurrentCropIndex(0);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    console.log('Loaded imageSrcs:', urls);
  };

  const onCropComplete = (_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  };

  const cropCurrentImage = async () => {
    const imgSrc = imageSrcs[currentCropIndex];
    if (!imgSrc || !croppedAreaPixels) {
      console.warn('Skipping crop - missing data', {
        imgSrc,
        croppedAreaPixels,
      });
      return;
    }

    try {
      console.log(`Cropping index ${currentCropIndex}...`);
      const blob = await getCroppedImg(imgSrc, croppedAreaPixels);
      const updated = [...croppedImages];
      updated[currentCropIndex] = blob;
      setCroppedImages(updated);
      console.log('Cropped image blob:', blob);
      // onImageReady(updated.filter(Boolean));
      onImageReady(updated[currentCropIndex]);
    } catch (err) {
      console.error('Crop error:', err);
    }
  };

  // New function to handle cropping and saving current image
  const cropAndSave = async () => {
    await cropCurrentImage();
  };

  const goToNext = async () => {
    await cropCurrentImage();
    if (currentCropIndex < imageSrcs.length - 1) {
      setCurrentCropIndex(currentCropIndex + 1);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    }
  };

  const goToPrev = async () => {
    await cropCurrentImage();
    if (currentCropIndex > 0) {
      setCurrentCropIndex(currentCropIndex - 1);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    }
  };

  const handleRemoveAll = () => {
    setImageSrcs([]);
    setCroppedImages([]);
    setCurrentCropIndex(0);
    onImageRemove();
  };

  // Check if current image is the first one
  const isFirstImage = currentCropIndex === 0;
  // Check if current image is the last one
  const isLastImage = currentCropIndex === imageSrcs.length - 1;
  // Check if there's only one image
  const isSingleImage = imageSrcs.length === 1;

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="mb-2"
        multiple={multiple}
      />

      {imageSrcs.length > 0 && (
        <>
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrcs[currentCropIndex]}
              crop={crop}
              zoom={zoom}
              aspect={aspectRatio}
              cropShape={cropShape}
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="flex justify-between mt-3 items-center">
            <button
              type="button"
              onClick={goToPrev}
              disabled={isFirstImage}
              className="text-sm text-blue-600 disabled:text-gray-400"
            >
              ◀ Prev
            </button>

            <span className="text-sm text-gray-600">
              {currentCropIndex + 1} / {imageSrcs.length}
            </span>

            {/* Show different buttons based on the situation */}
            {isSingleImage ? (
              // If there's only one image, show a "Crop & Save" button
              <button
                type="button"
                onClick={cropAndSave}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Crop & Save
              </button>
            ) : isLastImage ? (
              // If it's the last image, show "Crop & Finish" button
              <button
                type="button"
                onClick={cropAndSave}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Crop & Finish
              </button>
            ) : (
              // Otherwise show the regular Next button
              <button
                type="button"
                onClick={goToNext}
                className="text-sm text-blue-600"
              >
                Next ▶
              </button>
            )}

            <button
              type="button"
              onClick={handleRemoveAll}
              className="text-sm text-red-600 underline"
            >
              Remove All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

ImageCropUpload.propTypes = {
  onImageReady: PropTypes.func.isRequired,
  onImageRemove: PropTypes.func.isRequired,
  aspectRatio: PropTypes.number,
  cropShape: PropTypes.string,
  className: PropTypes.string,
  maxImages: PropTypes.number,
  multiple: PropTypes.bool,
};

export default ImageCropUpload;
