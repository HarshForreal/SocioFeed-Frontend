import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../../utils/cropImage';
import { toast } from 'react-toastify';

const ImageCropUpload = ({ onUpload }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onUploadClick = async () => {
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onUpload(croppedBlob); // pass cropped image blob to parent
      setImageSrc(null); // reset cropper UI
    } catch (err) {
      toast.error('Failed to crop image');
      console.error(err);
    }
  };

  return (
    <div>
      {!imageSrc ? (
        <input type="file" accept="image/*" onChange={onFileChange} />
      ) : (
        <>
          <div style={{ position: 'relative', width: 300, height: 300 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button
            onClick={onUploadClick}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload Cropped Image
          </button>
        </>
      )}
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

export default ImageCropUpload;
