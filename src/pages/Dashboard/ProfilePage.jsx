// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Modal from '../../components/common/Modal/Modal';
// import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
// import ProfileStats from '../../components/Dashboard/Profile/ProfileStats';
// import ProfileTabs from '../../components/Dashboard/Profile/ProfileTabs';
// import api from '../../api/client';
// import { fetchUserProfile } from '../../store/slices/userSlice';

// const ProfilePage = () => {
//   const dispatch = useDispatch();

//   // Get username from auth slice
//   const username = useSelector((state) => state.auth.user?.username);

//   // Profile slice data
//   const { profile, loading, error } = useSelector((state) => state.user);

//   // Modal state
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalList, setModalList] = useState([]);

//   // Fetch user profile when username available
//   useEffect(() => {
//     if (username) {
//       dispatch(fetchUserProfile(username));
//     }
//   }, [dispatch, username]);

//   // Fetch followers/following and open modal
//   const openModalWithList = async (listType) => {
//     if (!profile) return;

//     setModalTitle(listType === 'followers' ? 'Followers' : 'Following');

//     try {
//       const res = await api.get(`/user/${listType}/${profile.id}`);
//       setModalList(res.data[listType]);
//       setModalOpen(true);
//     } catch (err) {
//       console.error(`Failed to fetch ${listType}`, err);
//       setModalList([]);
//       setModalOpen(true);
//     }
//   };

//   if (loading) return <div>Loading profile...</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;
//   if (!profile) return null;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <ProfileHeader
//         user={profile}
//         onFollowersClick={() => openModalWithList('followers')}
//         onFollowingClick={() => openModalWithList('following')}
//       />
//       <ProfileStats user={profile} />
//       <ProfileTabs user={profile} />

//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title={modalTitle}
//         size="md"
//       >
//         {modalList.length === 0 ? (
//           <p className="p-4 text-center text-gray-500">
//             No {modalTitle.toLowerCase()} found.
//           </p>
//         ) : (
//           <ul className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
//             {modalList.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded cursor-pointer"
//               >
//                 <img
//                   src={item.avatarUrl || 'default-avatar.png'}
//                   alt={item.username}
//                   className="w-10 h-10 rounded-full object-cover"
//                 />
//                 <div>
//                   <p className="font-semibold">{item.username}</p>
//                   <p className="text-sm text-gray-500">
//                     {item.bio || 'No bio available'}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ProfilePage;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/common/Modal/Modal';
import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
import ProfileStats from '../../components/Dashboard/Profile/ProfileStats';
import ProfileTabs from '../../components/Dashboard/Profile/ProfileTabs';
import Post from '../../components/Post/Post';
import PostUploadModal from '../../components/Post/PostUploadModal';
import api from '../../api/client';
import { fetchUserProfile } from '../../store/slices/userSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.user?.username);
  const { profile, loading, error } = useSelector((state) => state.user);

  // Modal state for followers/following
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState([]);

  // Modal state for uploading post
  const [uploadOpen, setUploadOpen] = useState(false);

  // Dummy posts — replace with real data later
  const dummyPosts = profile
    ? [
        {
          id: 1,
          username: profile.username,
          avatarUrl: profile.profileImage,
          imageUrl: '/test-img.jpg',
          caption: 'Enjoying the sunshine!',
          createdAt: new Date().toISOString(),
        },
      ]
    : [];

  useEffect(() => {
    if (username) {
      dispatch(fetchUserProfile(username));
    }
  }, [dispatch, username]);

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

  const handlePostSubmit = async ({ image, caption }) => {
    console.log('Image:', image);
    console.log('Caption:', caption);

    // TODO: Replace this with actual API call to upload image + caption
    // Example:
    // const formData = new FormData();
    // formData.append('image', image);
    // formData.append('caption', caption);
    // await api.post('/post/create', formData);
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header & Stats */}
      <ProfileHeader
        user={profile}
        onFollowersClick={() => openModalWithList('followers')}
        onFollowingClick={() => openModalWithList('following')}
      />
      <ProfileStats user={profile} />

      {/* Post button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setUploadOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </div>

      {/* Tabs (if needed for Posts, Likes, etc.) */}
      <ProfileTabs user={profile} />

      {/* Posts */}
      <div className="mt-6">
        {dummyPosts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
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

      {/* Post Upload Modal */}
      <PostUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default ProfilePage;
