import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal/Modal';
import Form from '../../common/Form/Form';
import InputField from '../../common/Input/InputField';
import Button from '../../common/Button/Button';
import Avatar from '../../common/AvatarGroup/Avatar';
import LoadingSpinner from '../../common/Loader/LoadingSpinner';
import ImageCropUpload from './ImageCropUpload';
import { editUserProfile, uploadAvatar } from '../../../api/user';
import { toast } from 'react-toastify';

const EditProfileModal = ({ currentUser, onClose, onUpdate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.username,
    bio: currentUser.bio || '',
  });
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl || null);
  const [croppedAvatarBlob, setCroppedAvatarBlob] = useState(null);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        bio: currentUser.bio || '',
      });
      setAvatarUrl(currentUser.avatarUrl || null);
    }
  }, [currentUser]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Upload avatar to server
  const uploadAvatarToServer = async () => {
    console.log('[Avatar Upload] Preparing to upload...');
    if (!croppedAvatarBlob) return;

    try {
      setUploading(true);
      const formDataObj = new FormData();
      formDataObj.append('avatar', croppedAvatarBlob, 'avatar.jpg');

      console.log('[Avatar Upload] Uploading avatar...');
      const res = await uploadAvatar(formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newAvatarUrl = res.data.url;
      const timestamp = new Date().getTime();
      const avatarUrlWithTimestamp = `${newAvatarUrl}?t=${timestamp}`;

      console.log('[Avatar Upload] Upload successful:', avatarUrlWithTimestamp);
      setAvatarUrl(avatarUrlWithTimestamp);
      setCroppedAvatarBlob(null);
      toast.success('Avatar uploaded successfully!');
      return avatarUrlWithTimestamp;
    } catch (err) {
      console.error('[Avatar Upload] Failed:', err);
      toast.error('Failed to upload avatar');
      setAvatarUrl(currentUser.avatarUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Submit] Form submit triggered');

    try {
      let newAvatarUrl = avatarUrl;

      if (croppedAvatarBlob) {
        console.log('[Submit] Uploading new cropped avatar...');
        newAvatarUrl = await uploadAvatarToServer();
      } else {
        console.log('[Submit] No cropped avatar blob, skipping avatar upload');
      }

      console.log('[Submit] Sending profile update to backend...');
      const res = await editUserProfile({
        ...formData,
        avatarUrl: newAvatarUrl,
      });

      console.log('[Submit] Profile updated successfully:', res.data);
      onUpdate(res.data);
      onClose();
      toast.success('Profile updated successfully!');
    } catch (err) {
      console.error('[Submit] Error updating profile:', err);
      toast.error('Failed to update profile');
    }
  };

  const modalFooter = (
    <div className="flex justify-end gap-3">
      <Button
        text="Cancel"
        onClick={onClose}
        color="bg-gray-100"
        textColor="text-gray-700"
        className="border border-gray-300 hover:bg-gray-200"
      />

      <Button
        text={
          uploading ? (
            <LoadingSpinner size="sm" text="Saving..." />
          ) : (
            'Save Changes'
          )
        }
        onClick={handleSubmit}
        color="bg-gradient-to-r from-green-500 to-green-600"
        textColor="text-white"
        className="hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        type="submit"
        disabled={uploading}
      />
    </div>
  );

  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      title="Edit Profile"
      footer={modalFooter}
      size="lg"
    >
      <Form onSubmit={handleSubmit}>
        <div className="px-6 py-6 space-y-6">
          {/* Avatar Section */}
          <div className="text-center space-y-4">
            <Avatar
              src={
                croppedAvatarBlob
                  ? URL.createObjectURL(croppedAvatarBlob)
                  : avatarUrl
              }
              alt="Profile Avatar"
              fallback={formData.username.charAt(0).toUpperCase()}
              size="lg"
              showUpdateIndicator={uploading}
            />

            <ImageCropUpload
              onImageReady={(blob) => {
                if (blob instanceof Blob) {
                  console.log('[ImageCropUpload] Cropped blob ready');
                  setCroppedAvatarBlob(blob);
                  const objectURL = URL.createObjectURL(blob);
                  setAvatarUrl(objectURL);
                } else {
                  console.error(
                    '[ImageCropUpload] Invalid blob received:',
                    blob
                  );
                  toast.error(
                    'Something went wrong while processing the image.'
                  );
                }
              }}
              onImageRemove={() => {
                console.log('[ImageCropUpload] Image removed');
                setCroppedAvatarBlob(null);
                setAvatarUrl(currentUser.avatarUrl || null);
              }}
              aspectRatio={1}
              cropShape="round"
              className="max-w-md mx-auto"
            />
            {uploading && (
              <div className="flex items-center justify-center text-blue-600">
                <LoadingSpinner size="sm" text="Uploading avatar..." />
              </div>
            )}
          </div>

          <InputField
            label="Username"
            value={formData.username}
            onChange={handleInputChange('username')}
            placeholder="Enter your username"
            name="username"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          <div className="space-y-2">
            <InputField
              label="Bio"
              value={formData.bio}
              onChange={handleInputChange('bio')}
              placeholder="Tell us about yourself..."
              name="bio"
              as="textarea"
              rows={4}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <div className="text-right text-xs text-gray-400">
              {formData.bio.length}/150 characters
            </div>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

EditProfileModal.propTypes = {
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
    bio: PropTypes.string,
    avatarUrl: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EditProfileModal;
