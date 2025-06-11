import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/common/Modal/Modal';
import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
import Post from '../../components/Post/Post';
import PostUploadModal from '../../components/Post/PostUploadModal';
import Button from '../../components/common/Button/Button';
import {
  uploadAndCreatePost,
  fetchUserPosts,
} from '../../store/thunks/postThunks';
import {
  getUserProfile,
  followUser,
  unfollowUser,
  fetchFollowingList,
} from '../../api/user';
import api from '../../api/client';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username: routeUsername } = useParams();
  const { posts, loading: postsLoading } = useSelector((state) => state.posts);
  const loggedInUser = useSelector((state) => state.auth.user);

  // Use local state for profile data instead of Redux
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);

  const [followingList, setFollowingList] = useState([]);

  const isMyProfile = loggedInUser?.username === routeUsername;
  const isFollowing = followingList.some((user) => user.id === profile?.id);

  // Fetch user profile
  useEffect(() => {
    if (routeUsername) {
      setProfileLoading(true);
      setProfileError(null);

      getUserProfile(routeUsername)
        .then((res) => {
          setProfile(res.data);
          setProfileLoading(false);
          // Fetch posts for this specific user
          dispatch(fetchUserPosts({ userId: res.data.id }));
        })
        .catch((err) => {
          console.error('Failed to fetch user profile:', err);
          setProfileError('Failed to load profile');
          setProfileLoading(false);
        });
    }
  }, [dispatch, routeUsername]); // Only depend on routeUsername

  // Fetch following list
  useEffect(() => {
    fetchFollowingList()
      .then((following) => setFollowingList(following))
      .catch((err) => {
        console.error('Failed to fetch following list:', err);
        setFollowingList([]);
      });
  }, []);

  // Clear profile when route changes
  useEffect(() => {
    return () => {
      setProfile(null);
    };
  }, [routeUsername]);

  const handleFollowToggle = () => {
    if (!profile) return;

    if (isFollowing) {
      unfollowUser(profile.id)
        .then(() => {
          setFollowingList((list) =>
            list.filter((user) => user.id !== profile.id)
          );
          // Update profile follower count
          setProfile((prev) => ({
            ...prev,
            followersCount: (prev.followersCount || 0) - 1,
          }));
        })
        .catch((err) => console.error('Failed to unfollow:', err));
    } else {
      followUser(profile.id)
        .then(() => {
          setFollowingList((list) => [...list, profile]);
          // Update profile follower count
          setProfile((prev) => ({
            ...prev,
            followersCount: (prev.followersCount || 0) + 1,
          }));
        })
        .catch((err) => console.error('Failed to follow:', err));
    }
  };

  const handlePostSubmit = (postData) => {
    dispatch(uploadAndCreatePost(postData))
      .then(() => {
        setUploadOpen(false);
        // Refresh posts after upload
        if (profile?.id) {
          dispatch(fetchUserPosts({ userId: profile.id }));
        }
      })
      .catch((err) => {
        console.error('Post upload failed:', err);
      });
  };

  const openModalWithList = async (listType) => {
    if (!profile) return;
    setModalTitle(listType === 'followers' ? 'Followers' : 'Following');

    try {
      const res = await api.get(`/user/${listType}/${profile.id}`);
      setModalList(res.data[listType]);
      setModalOpen(true);
    } catch (err) {
      console.error(`Failed to fetch ${listType}`, err);
      setModalList([]);
      setModalOpen(true);
    }
  };

  if (profileLoading) return <div>Loading profile...</div>;
  if (profileError)
    return <div className="text-red-500">Error: {profileError}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader
        user={profile}
        onFollowersClick={() => openModalWithList('followers')}
        onFollowingClick={() => openModalWithList('following')}
      />

      {/* Action Buttons */}
      <div className="flex justify-end mb-4">
        {isMyProfile ? (
          <Button text="Post" onClick={() => setUploadOpen(true)} />
        ) : (
          <Button
            text={isFollowing ? 'Unfollow' : 'Follow'}
            onClick={handleFollowToggle}
            color={isFollowing ? 'bg-gray-300' : 'bg-blue-500'}
            textColor={isFollowing ? 'text-black' : 'text-white'}
          />
        )}
      </div>

      <div className="mt-6">
        {!isMyProfile && !isFollowing ? (
          <p className="text-center text-gray-500 mt-4">
            Please follow to view posts.
          </p>
        ) : posts.length === 0 && !postsLoading ? (
          <p className="text-center text-gray-500 mt-4">No posts to display.</p>
        ) : (
          posts.map((post) => (
            <Post key={post.id} post={{ ...post, images: post.images || [] }} />
          ))
        )}
      </div>

      {/* Followers / Following Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalTitle}
        size="md"
      >
        {modalList.length === 0 ? (
          <p className="p-4 text-center text-gray-500">
            No {modalTitle.toLowerCase()} found.
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {modalList.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded cursor-pointer"
              >
                <img
                  src={item.avatarUrl || 'default-avatar.png'}
                  alt={item.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{item.username}</p>
                  <p className="text-sm text-gray-500">
                    {item.bio || 'No bio available'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      {/* Upload Post Modal */}
      <PostUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default ProfilePage;
