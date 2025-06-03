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
  const [userUpdated, setUserUpdated] = useState(false);

  // Animation effect - similar to your original
  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  // Reset form data when component mounts with new user data
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        bio: currentUser.bio || '',
      });
      setAvatarUrl(currentUser.avatarUrl || null);
      setUserUpdated(false);
    }
  }, [currentUser]);

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleAvatarUpload = async (croppedBlob) => {
    try {
      setUploading(true);
      const formDataObj = new FormData();
      formDataObj.append('avatar', croppedBlob, 'avatar.jpg');

      const res = await uploadAvatar(formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAvatarUrl(res.data.url);
      setUserUpdated(true);
      toast.success('Avatar uploaded successfully!');
    } catch (err) {
      toast.error('Failed to upload avatar');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await editUserProfile({
        ...formData,
        avatarUrl,
      });

      onUpdate(res.data);
      onClose();
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile');
      console.error(err);
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
      />
    </div>
  );

  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      title="Edit Profile"
      footer={modalFooter}
      size="md"
    >
      <Form onSubmit={handleSubmit}>
        <div className="px-6 py-6 space-y-6">
          {/* Avatar Section */}
          <div className="text-center">
            <Avatar
              src={avatarUrl}
              alt="Profile Avatar"
              fallback={formData.username.charAt(0).toUpperCase()}
              size="lg"
              showUpdateIndicator={userUpdated && !uploading}
            />

            <div className="mt-4">
              <ImageCropUpload onUpload={handleAvatarUpload} />

              {uploading && (
                <div className="mt-3 flex items-center justify-center text-blue-600">
                  <LoadingSpinner size="sm" text="Uploading avatar..." />
                </div>
              )}

              {userUpdated && !uploading && (
                <p className="text-sm text-green-600 mt-2 font-medium">
                  ✓ Avatar updated successfully!
                </p>
              )}
            </div>
          </div>

          {/* Username Field */}
          <InputField
            label="Username"
            value={formData.username}
            onChange={handleInputChange('username')}
            placeholder="Enter your username"
            name="username"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />

          {/* Bio Field */}
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
