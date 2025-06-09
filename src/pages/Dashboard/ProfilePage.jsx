// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import Modal from '../../components/common/Modal/Modal';
// import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
// import Post from '../../components/Post/Post';
// import PostUploadModal from '../../components/Post/PostUploadModal';
// import Button from '../../components/common/Button/Button';
// import api from '../../api/client';
// import {
//   fetchUserProfile,
//   followUser,
//   unfollowUser,
// } from '../../store/thunks/userThunks';
// import {
//   fetchUserPosts,
//   uploadAndCreatePost,
// } from '../../store/thunks/postThunks';

// const ProfilePage = () => {
//   const dispatch = useDispatch();
//   const { username: routeUsername } = useParams();
//   const { profile, loading, error } = useSelector((state) => state.user);
//   console.log('Profile', profile);
//   const { posts, loading: postsLoading } = useSelector((state) => state.posts);
//   console.log('Posts before rendering:', posts);

//   const loggedInUser = useSelector((state) => state.auth.user);

//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState('');
//   const [modalList, setModalList] = useState([]);
//   const [uploadOpen, setUploadOpen] = useState(false);

//   const isMyProfile = loggedInUser?.username === routeUsername;

//   const isFollowing = profile?.followers?.some(
//     (follower) => follower.followerId === loggedInUser?.id
//   );
//   console.log('isFollowing', isFollowing);
//   useEffect(() => {
//     if (routeUsername) {
//       dispatch(fetchUserProfile(routeUsername));
//     }
//   }, [dispatch, routeUsername]);

//   useEffect(() => {
//     if (profile?.id) {
//       dispatch(fetchUserPosts({ userId: profile.id }));
//     }
//   }, [dispatch, profile?.id]);

//   const handleFollowToggle = () => {
//     if (!profile) return;

//     if (isFollowing) {
//       dispatch(unfollowUser(profile.id));
//     } else {
//       dispatch(followUser(profile.id));
//     }
//   };

//   const handlePostSubmit = (postData) => {
//     dispatch(uploadAndCreatePost(postData))
//       .then(() => setUploadOpen(false))
//       .catch((err) => {
//         console.error('Post upload failed:', err);
//       });
//   };

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

//       {/* Action Buttons */}
//       <div className="flex justify-end mb-4">
//         {isMyProfile ? (
//           <Button text="Post" onClick={() => setUploadOpen(true)} />
//         ) : (
//           <Button
//             text={isFollowing ? 'Unfollow' : 'Follow'}
//             onClick={handleFollowToggle}
//             color={isFollowing ? 'bg-gray-300' : 'bg-blue-500'}
//             textColor={isFollowing ? 'text-black' : 'text-white'}
//           />
//         )}
//       </div>

//       {/* Render Posts */}
//       <div className="mt-6">
//         {!isMyProfile && !isFollowing ? (
//           <p className="text-center text-gray-500 mt-4">
//             Please follow to view posts.
//           </p>
//         ) : posts.length === 0 && !postsLoading ? (
//           <p className="text-center text-gray-500 mt-4">No posts to display.</p>
//         ) : (
//           posts.map((post) => (
//             <Post key={post.id} post={{ ...post, images: post.images || [] }} />
//           ))
//         )}
//       </div>

//       {/* Followers / Following Modal */}
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

//       {/* Upload Post Modal */}
//       <PostUploadModal
//         isOpen={uploadOpen}
//         onClose={() => setUploadOpen(false)}
//         onSubmit={handlePostSubmit}
//       />
//     </div>
//   );
// };

// export default ProfilePage;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/common/Modal/Modal';
import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
import Post from '../../components/Post/Post';
import PostUploadModal from '../../components/Post/PostUploadModal';
import Button from '../../components/common/Button/Button';
import api from '../../api/client';
import {
  fetchUserProfile,
  followUser,
  unfollowUser,
} from '../../store/thunks/userThunks';
import {
  fetchUserPosts,
  uploadAndCreatePost,
} from '../../store/thunks/postThunks';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username: routeUsername } = useParams();
  const { profile, loading, error } = useSelector((state) => state.user);
  const { posts, loading: postsLoading } = useSelector((state) => state.posts);
  const loggedInUser = useSelector((state) => state.auth.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);

  // New state to store the following list of logged in user
  const [followingList, setFollowingList] = useState([]);

  const isMyProfile = loggedInUser?.username === routeUsername;

  // Determine if loggedInUser follows the profile user by checking followingList
  const isFollowing = followingList.some((user) => user.id === profile?.id);

  useEffect(() => {
    if (routeUsername) {
      dispatch(fetchUserProfile(routeUsername));
    }
  }, [dispatch, routeUsername]);

  useEffect(() => {
    if (profile?.id) {
      dispatch(fetchUserPosts({ userId: profile.id }));
    }
  }, [dispatch, profile?.id]);

  // Fetch logged-in user's following list from backend
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await api.get('/user/following'); // endpoint from backend
        setFollowingList(res.data.following || []);
      } catch (err) {
        console.error('Failed to fetch following list:', err);
        setFollowingList([]);
      }
    };
    fetchFollowing();
  }, []);

  const handleFollowToggle = () => {
    if (!profile) return;

    if (isFollowing) {
      dispatch(unfollowUser(profile.id)).then(() => {
        // Update following list after unfollow
        setFollowingList((list) =>
          list.filter((user) => user.id !== profile.id)
        );
      });
    } else {
      dispatch(followUser(profile.id)).then(() => {
        // Update following list after follow
        setFollowingList((list) => [...list, profile]);
      });
    }
  };

  const handlePostSubmit = (postData) => {
    dispatch(uploadAndCreatePost(postData))
      .then(() => setUploadOpen(false))
      .catch((err) => {
        console.error('Post upload failed:', err);
      });
  };

  const openModalWithList = async (listType) => {
    if (!profile) return;
    setModalTitle(listType === 'followers' ? 'Followers' : 'Following');

    try {
      // Note: Your backend endpoints for followers/following modal are like /user/followers/:userId or /user/following/:userId
      const res = await api.get(`/user/${listType}/${profile.id}`);
      setModalList(res.data[listType]);
      setModalOpen(true);
    } catch (err) {
      console.error(`Failed to fetch ${listType}`, err);
      setModalList([]);
      setModalOpen(true);
    }
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

      {/* Render Posts */}
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
