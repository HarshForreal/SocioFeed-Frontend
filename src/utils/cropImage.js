// // src/utils/getCroppedImg.js

// export default function getCroppedImg(imageSrc, pixelCrop) {
//   const canvas = document.createElement('canvas');
//   const image = new Image();

//   return new Promise((resolve, reject) => {
//     image.crossOrigin = 'anonymous'; // ✅ Fix for CORS & canvas taint issues

//     image.onload = () => {
//       canvas.width = pixelCrop.width;
//       canvas.height = pixelCrop.height;
//       const ctx = canvas.getContext('2d');

//       ctx.drawImage(
//         image,
//         pixelCrop.x,
//         pixelCrop.y,
//         pixelCrop.width,
//         pixelCrop.height,
//         0,
//         0,
//         pixelCrop.width,
//         pixelCrop.height
//       );

//       canvas.toBlob((blob) => {
//         if (!blob) {
//           reject(new Error('Canvas is empty'));
//           return;
//         }
//         resolve(blob);
//       }, 'image/jpeg');
//     };

//     image.onerror = (error) => reject(error);
//     image.src = imageSrc;
//   });
// }

// utils/cropImage.js
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
