// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPost } from '../../store/slices/postsSlice';
// import Modal from '../common/Modal/Modal';
// import { X } from 'lucide-react';
// import api from '../../api/client';

// const PostUploadModal = ({ isOpen, onClose, onSubmit }) => {
//   const dispatch = useDispatch();
//   const { user, isLoggedIn } = useSelector((state) => state.auth);
//   const [images, setImages] = useState([]);
//   const [caption, setCaption] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Handle multiple image selection
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);

//     // Validate file count (1-4 images)
//     if (files.length > 4) {
//       alert('You can upload maximum 4 images');
//       return;
//     }

//     // Validate file types
//     const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
//     const invalidFiles = files.filter(
//       (file) => !validTypes.includes(file.type)
//     );

//     if (invalidFiles.length > 0) {
//       alert('Please select only JPEG, PNG, or GIF images');
//       return;
//     }

//     // Validate file sizes (max 5MB per file)
//     const oversizedFiles = files.filter((file) => file.size > 5 * 1024 * 1024);

//     if (oversizedFiles.length > 0) {
//       alert('Each image must be less than 5MB');
//       return;
//     }

//     setImages(files);
//   };

//   // Remove individual image
//   const removeImage = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     setImages(updatedImages);

//     // Reset file input
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   // Handle the form submission
//   const handleSubmit = async () => {
//     if (images.length === 0 || !caption.trim()) {
//       alert('Please select at least one image and add a caption');
//       return;
//     }

//     // Check if the user is logged in and token exists in localStorage
//     const token = localStorage.getItem('token');

//     if (isLoggedIn && user && token) {
//       setIsSubmitting(true);
//       try {
//         // Create FormData and append all images
//         const formData = new FormData();
//         images.forEach((image) => {
//           formData.append('images', image); // Match the backend field name 'images'
//         });

//         // Send the file upload request (don't set Content-Type, let browser set it)
//         const uploadResponse = await api.post('/post/upload', formData, {
//           withCredentials: true,
//         });

//         // Once the images are uploaded, proceed with creating the post
//         const postData = {
//           content: caption.trim(),
//           imageUrls: uploadResponse.data.imageUrls, // Use the image URLs from the response
//         };

//         console.log(
//           'Images uploaded successfully:',
//           uploadResponse.data.imageUrls
//         );
//         console.log('Creating post with data:', postData);

//         // Make direct API call to create post since images are already uploaded
//         const postResponse = await api.post('/post/create', postData);

//         console.log('Post created successfully:', postResponse.data);

//         // Add the new post to Redux store manually
//         dispatch(addPost(postResponse.data));

//         // Clear form and close modal after successful post creation
//         setImages([]);
//         setCaption('');
//         onClose(); // Close the modal after successful submission

//         // Optionally call onSubmit (if provided)
//         if (onSubmit) {
//           onSubmit(); // Notify the parent component (if needed)
//         }
//       } catch (error) {
//         console.error('Error during image upload:', error);

//         // Better error handling
//         if (error.response?.data?.message) {
//           alert(`Error: ${error.response.data.message}`);
//         } else {
//           alert('Failed to create post. Please try again.');
//         }
//       } finally {
//         setIsSubmitting(false);
//       }
//     } else {
//       console.log('User is not logged in or token is missing');
//       alert('Please log in to create a post.');
//       onClose();
//     }
//   };

//   // Reset form when modal closes
//   const handleClose = () => {
//     setImages([]);
//     setCaption('');
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose} title="Create Post" size="md">
//       <div className="p-4 space-y-4">
//         {/* Image Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Select Images (1-4 images)
//           </label>
//           <input
//             type="file"
//             accept="image/jpeg,image/jpg,image/png,image/gif"
//             multiple
//             onChange={handleImageChange}
//             className="w-full p-2 border border-gray-300 rounded-md"
//           />
//           <p className="text-xs text-gray-500 mt-1">
//             Supported formats: JPEG, PNG, GIF (Max 5MB each)
//           </p>
//         </div>

//         {/* Image Preview */}
//         {images.length > 0 && (
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-700">
//               Selected Images ({images.length}/4)
//             </label>
//             <div className="grid grid-cols-2 gap-2">
//               {images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-24 object-cover rounded-md border"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
//                     disabled={isSubmitting}
//                   >
//                     <X size={12} />
//                   </button>
//                   <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
//                     {(image.size / 1024 / 1024).toFixed(1)}MB
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Caption */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Caption *
//           </label>
//           <textarea
//             placeholder="Write a caption..."
//             className="w-full p-2 border border-gray-300 rounded-md resize-none"
//             rows="4"
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             maxLength={500}
//             disabled={isSubmitting}
//           />
//           <div className="text-xs text-gray-500 text-right mt-1">
//             {caption.length}/500 characters
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-end gap-2 pt-2">
//           <button
//             className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//             onClick={handleClose}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
//             onClick={handleSubmit}
//             disabled={images.length === 0 || !caption.trim() || isSubmitting}
//           >
//             {isSubmitting ? 'Posting...' : 'Post'}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default PostUploadModal;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../store/slices/postsSlice';
import Modal from '../common/Modal/Modal';
import ImageCropUpload from '../Dashboard/Profile/ImageCropUpload';
import { toast } from 'react-toastify';
import api from '../../api/client';

const PostUploadModal = ({ isOpen, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const [croppedImages, setCroppedImages] = useState([]);
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle when images are ready from the crop component
  const handleImagesReady = (imageBlobs) => {
    setCroppedImages(imageBlobs);
  };

  // Handle when images are removed
  const handleImageRemove = () => {
    setCroppedImages([]);
  };

  // Handle the form submission
  const handleSubmit = async () => {
    if (croppedImages.length === 0 || !caption.trim()) {
      toast.error('Please select at least one image and add a caption');
      return;
    }

    // Check if the user is logged in and token exists in localStorage
    const token = localStorage.getItem('token');

    if (isLoggedIn && user && token) {
      setIsSubmitting(true);
      try {
        // Create FormData and append all cropped images
        const formData = new FormData();
        croppedImages.forEach((imageBlob, index) => {
          formData.append('images', imageBlob, `image-${index}.jpg`);
        });

        console.log(`Uploading ${croppedImages.length} images...`);

        // Send the file upload request
        const uploadResponse = await api.post('/post/upload', formData, {
          withCredentials: true,
        });

        console.log(
          'Images uploaded successfully:',
          uploadResponse.data.imageUrls
        );

        // Once the images are uploaded, proceed with creating the post
        const postData = {
          content: caption.trim(),
          imageUrls: uploadResponse.data.imageUrls,
        };

        console.log('Creating post with data:', postData);

        // Make direct API call to create post since images are already uploaded
        const postResponse = await api.post('/post/create', postData);

        console.log('Post created successfully:', postResponse.data);

        // Add the new post to Redux store
        dispatch(addPost(postResponse.data));

        // Show success message
        toast.success('Post created successfully!');

        // Clear form and close modal after successful post creation
        setCroppedImages([]);
        setCaption('');
        onClose();

        // Optionally call onSubmit callback
        if (onSubmit) {
          onSubmit();
        }
      } catch (error) {
        console.error('Error during post creation:', error);

        // Better error handling
        if (error.response?.data?.message) {
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          toast.error('Failed to create post. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('User is not logged in or token is missing');
      toast.error('Please log in to create a post.');
      onClose();
    }
  };

  // Reset form when modal closes
  const handleClose = () => {
    setCroppedImages([]);
    setCaption('');
    onClose();
  };

  // Check if we can submit
  const canSubmit = croppedImages.length > 0 && caption.trim() && !isSubmitting;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Post" size="lg">
      <div className="p-6 space-y-6">
        {/* Image Upload and Crop Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Images for Your Post
            </label>
            <ImageCropUpload
              onImageReady={handleImagesReady}
              onImageRemove={handleImageRemove}
              multiple={true}
              maxImages={4}
              aspectRatio={4 / 5} // Instagram-like aspect ratio for posts
              cropShape="rect"
              buttonText="Select Images (1-4)"
              className="border border-gray-200 rounded-lg p-4"
            />
          </div>

          {/* Show selected images count */}
          {croppedImages.length > 0 && (
            <div className="text-center">
              <p className="text-sm text-green-600 font-medium">
                ✓ {croppedImages.length} image
                {croppedImages.length > 1 ? 's' : ''} ready for posting
              </p>
            </div>
          )}
        </div>

        {/* Caption Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Caption *
          </label>
          <textarea
            placeholder="Write a caption for your post..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            rows="4"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            maxLength={500}
            disabled={isSubmitting}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Share your thoughts, story, or experience...</span>
            <span>{caption.length}/500 characters</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            className="px-6 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium rounded-lg text-white transition-all duration-200 ${
              canSubmit
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
            disabled={!canSubmit}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Posting...
              </div>
            ) : (
              'Create Post'
            )}
          </button>
        </div>

        {/* Submission Status */}
        {isSubmitting && (
          <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
            <p>📤 Uploading your images and creating post...</p>
            <p className="text-xs text-gray-600 mt-1">
              This may take a few moments
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PostUploadModal;
