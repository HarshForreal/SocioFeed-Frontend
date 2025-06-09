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
    if (Array.isArray(imageBlobs)) {
      setCroppedImages(imageBlobs);
    } else if (imageBlobs) {
      setCroppedImages([imageBlobs]);
    } else {
      setCroppedImages([]);
    }
  };

  // Handle when images are removed
  const handleImageRemove = () => {
    setCroppedImages([]);
  };

  // Check if we can submit
  const imagesArray = Array.isArray(croppedImages)
    ? croppedImages
    : croppedImages
      ? [croppedImages]
      : [];
  const canSubmit = imagesArray.length > 0 && caption.trim() && !isSubmitting;
  // Handle the form submission
  const handleSubmit = async () => {
    // Ensure croppedImages is an array
    const imagesArray = Array.isArray(croppedImages)
      ? croppedImages
      : croppedImages
        ? [croppedImages]
        : [];

    if (imagesArray.length === 0 || !caption.trim()) {
      toast.error('Please select at least one image and add a caption');
      return;
    }

    const token = localStorage.getItem('token');

    if (isLoggedIn && user && token) {
      setIsSubmitting(true);
      try {
        // Create FormData and append all cropped images
        const formData = new FormData();
        imagesArray.forEach((imageBlob, index) => {
          formData.append('images', imageBlob, `image-${index}.jpg`);
        });

        // Send the file upload request
        const uploadResponse = await api.post('/post/upload', formData, {
          withCredentials: true,
        });

        // Once the images are uploaded, proceed with creating the post
        const postData = {
          content: caption.trim(),
          imageUrls: uploadResponse.data.imageUrls,
        };

        // Make direct API call to create post
        const postResponse = await api.post('/post/create', postData);

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
        if (error.response?.data?.message) {
          toast.error(`Error: ${error.response.data.message}`);
        } else {
          toast.error('Failed to create post. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
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
          {(Array.isArray(croppedImages)
            ? croppedImages
            : croppedImages
              ? [croppedImages]
              : []
          ).length > 0 && (
            <div className="text-center">
              <p className="text-sm text-green-600 font-medium">
                ✓{' '}
                {
                  (Array.isArray(croppedImages)
                    ? croppedImages
                    : [croppedImages]
                  ).length
                }{' '}
                image
                {(Array.isArray(croppedImages)
                  ? croppedImages
                  : [croppedImages]
                ).length > 1
                  ? 's'
                  : ''}{' '}
                ready for posting
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
