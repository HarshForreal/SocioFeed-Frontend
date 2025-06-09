export default function getCroppedImg(imageSrc, croppedAreaPixels) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext('2d');

      try {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          resolve(blob);
        }, 'image/jpeg');
      } catch (err) {
        reject(new Error('DrawImage error: ' + err.message));
      }
    };

    image.onerror = (err) => {
      reject(new Error('Image load error: ' + err.message));
    };

    if (
      imageSrc &&
      typeof imageSrc === 'string' &&
      imageSrc.startsWith('data:image/')
    ) {
      image.src = imageSrc;
    } else {
      reject(new Error('Invalid image source: ' + imageSrc));
    }
  });
}
