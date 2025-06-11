import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';
import SidebarProfile from './SidebarProfile';
import LogoutButton from './LogoutButton';
import EditProfileModal from '../Profile/EditProfileModal';
import { setUser } from '../../../store/slices/authSlice';
import { getUserProfile } from '../../../api/user';
import ChatSidebar from '../../Chat/ChatSidebar';

const LeftSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.user);

  // Use local state for logged-in user's profile to prevent interference
  const [loggedInUserProfile, setLoggedInUserProfile] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showChatSidebar, setShowChatSidebar] = useState(false);

  // Fetch logged-in user's profile separately
  useEffect(() => {
    if (loggedInUser?.username) {
      getUserProfile(loggedInUser.username)
        .then((res) => {
          setLoggedInUserProfile(res.data);
        })
        .catch((error) => {
          console.error('Failed to fetch logged-in user profile:', error);
          // Fallback to using loggedInUser data if profile fetch fails
          setLoggedInUserProfile(loggedInUser);
        });
    }
  }, [loggedInUser]);

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  const handleProfileUpdate = (updatedUser) => {
    dispatch(setUser(updatedUser));
    // Update local profile state as well
    setLoggedInUserProfile(updatedUser);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-64 transform bg-white transition-transform duration-300 border-r border-gray-200 shadow-lg
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:flex md:flex-col md:h-screen md:w-64`}
      >
        {/* Mobile Close */}
        <div className="md:hidden p-4 flex justify-end border-b border-gray-100">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <SidebarHeader />

        {showChatSidebar ? (
          <ChatSidebar onBack={() => setShowChatSidebar(false)} />
        ) : (
          <SidebarMenu
            onEditProfile={loggedInUser ? openEdit : null}
            hideProfileOption
            onChatClick={() => setShowChatSidebar(true)}
          />
        )}

        {/* Show SidebarProfile only when both loggedInUser and loggedInUserProfile are loaded */}
        {loggedInUser && loggedInUserProfile && (
          <div className="mt-auto border-t border-gray-100 p-4">
            <Link
              to={`/profile/${loggedInUser.username}`}
              className="block hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
            >
              <SidebarProfile
                name={loggedInUserProfile.username}
                profileImage={loggedInUserProfile.avatarUrl}
                followers={
                  loggedInUserProfile.followerCount ||
                  loggedInUserProfile.followersCount
                }
                following={loggedInUserProfile.followingCount}
              />
            </Link>

            <button
              onClick={openEdit}
              className="mt-3 w-full px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors duration-200 font-medium"
              aria-label="Edit Profile"
            >
              Edit Profile
            </button>
          </div>
        )}

        <LogoutButton />
      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && loggedInUser && (
        <EditProfileModal
          currentUser={loggedInUser}
          onClose={closeEdit}
          onUpdate={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default LeftSidebar;
