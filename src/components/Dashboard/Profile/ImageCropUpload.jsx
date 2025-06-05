import React, { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utils/cropImage';
import PropTypes from 'prop-types';

const ImageCropUpload = ({
  onImageReady,
  onImageRemove,
  aspectRatio = 1,
  cropShape = 'round',
  className = '',
}) => {
  const inputRef = useRef();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleAutoCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onImageReady(croppedImage);
    } catch (err) {
      console.error('Auto crop failed', err);
    }
  };

  // trigger crop once cropped area is available
  React.useEffect(() => {
    if (imageSrc && croppedAreaPixels) {
      handleAutoCrop();
    }
  }, [croppedAreaPixels]);

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="mb-2"
      />

      {imageSrc && (
        <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
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
      )}

      {imageSrc && (
        <div className="flex justify-center mt-2">
          <button
            type="button"
            onClick={() => {
              setImageSrc(null);
              onImageRemove();
            }}
            className="text-sm text-red-600 underline"
          >
            Remove Image
          </button>
        </div>
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
};

export default ImageCropUpload;
