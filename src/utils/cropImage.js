export default function getCroppedImg(
  imageSrc,
  croppedAreaPixels,
  quality = 0.7
) {
  return new Promise((resolve, reject) => {
    if (
      !croppedAreaPixels ||
      !croppedAreaPixels.width ||
      !croppedAreaPixels.height
    ) {
      reject(new Error('Invalid cropped area dimensions'));
      return;
    }

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

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Canvas is empty'));
              return;
            }
            resolve(blob);
          },
          'image/jpeg',
          quality
        );
      } catch (err) {
        reject(new Error('Error while cropping the image: ' + err.message));
      }
    };

    image.onerror = (err) => {
      reject(new Error('Image load error: ' + err.message));
    };

    if (
      !imageSrc ||
      typeof imageSrc !== 'string' ||
      !imageSrc.startsWith('data:image/')
    ) {
      reject(new Error('Invalid image source, expected a base64 string'));
      return;
    }

    image.src = imageSrc;
  });
}
