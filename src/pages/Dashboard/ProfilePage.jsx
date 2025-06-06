import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/common/Modal/Modal';
import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
import Post from '../../components/Post/Post';
import PostUploadModal from '../../components/Post/PostUploadModal';
import { fetchUserProfile } from '../../store/slices/userSlice';
import { fetchUserPosts } from '../../store/slices/postsSlice';
import { uploadAndCreatePost } from '../../store/slices/postsSlice';
import api from '../../api/client';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user?.username);
  const userId = useSelector((state) => state.auth.user?.id);
  const { profile, loading, error } = useSelector((state) => state.user);

  const { posts, loading: postsLoading } = useSelector((state) => state.posts);
  console.log('Posts', posts);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username));
    }
  }, [dispatch, username]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts({ userId }));
    }
  }, [dispatch, userId]);

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

  const handlePostSubmit = (postData) => {
    // Dispatch the action to upload image and create a post
    dispatch(uploadAndCreatePost(postData))
      .then(() => {
        // Success: close the modal
        setModalOpen(false);
      })
      .catch((err) => {
        // Handle error if post creation fails
        console.error('Post upload failed:', err);
      });
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader
        user={profile}
        onFollowersClick={() => openModalWithList('followers')}
        onFollowingClick={() => openModalWithList('following')}
      />

      {/* Post button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setUploadOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </div>

      {/* Render posts */}
      <div className="mt-6">
        {posts.length === 0 && !postsLoading && <p>No posts to display.</p>}

        {posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
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

      <PostUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default ProfilePage;
