import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileHeader from '../../components/Dashboard/Profile/ProfileHeader';
import Button from '../../components/common/Button/Button';
import Post from '../../components/Post/Post';
import PostUploadModal from '../../components/Post/PostUploadModal';
import FollowersFollowingModal from '../../components/Dashboard/Profile/FollowersFollowingModal';
import { fetchUserPosts } from '../../store/thunks/postThunks';
import { fetchFollowingList } from '../../store/thunks/userThunks';
import useProfile from '../../hooks/useProfile';
import useFollow from '../../hooks/useFollow';
import { uploadAndCreatePost } from '../../store/thunks/postThunks';

import api from '../../api/client';
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username: routeUsername } = useParams();
  const loggedInUser = useSelector((state) => state.auth.user);
  const followingList = useSelector((state) => state.user.following);

  const {
    posts,
    loading: postsLoading,
    error: postsError,
  } = useSelector((state) => state.posts);

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile(routeUsername);

  console.log('Profile of searched user', profile);
  console.log('Following list:', followingList);

  const { isFollowing, toggleFollow } = useFollow(profile?.id, followingList);
  console.log('IsFollowing', isFollowing);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalList, setModalList] = useState([]);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchFollowingList());
    }
  }, [dispatch, loggedInUser]);

  useEffect(() => {
    if (profile?.id) {
      dispatch(fetchUserPosts({ userId: profile.id, skip: 0, take: 10 }));
    }
  }, [dispatch, profile?.id]);

  const handlePostSubmit = (postData) => {
    dispatch(uploadAndCreatePost(postData))
      .then(() => {
        setUploadOpen(false);
      })
      .catch((err) => {
        console.error('Post upload failed:', err);
      });
  };

  const openModalWithList = async (listType) => {
    setModalTitle(listType === 'followers' ? 'Followers' : 'Following');
    if (!profile) return;
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

  if (profileLoading || postsLoading) return <div>Loading...</div>;
  if (profileError || postsError)
    return (
      <div className="text-red-500">Error: {profileError || postsError}</div>
    );

  if (!profile || !posts) {
    return <div>No profile or posts available</div>;
  }

  const isMyProfile = loggedInUser?.username === routeUsername;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ProfileHeader
        user={profile}
        onFollowersClick={() => openModalWithList('followers')}
        onFollowingClick={() => openModalWithList('following')}
      />

      <div className="flex justify-end mb-4">
        {isMyProfile ? (
          <Button text="Post" onClick={() => setUploadOpen(true)} />
        ) : (
          <Button
            text={isFollowing ? 'Unfollow' : 'Follow'}
            onClick={toggleFollow}
            color={isFollowing ? 'bg-gray-300' : 'bg-blue-500'}
            textColor={isFollowing ? 'text-black' : 'text-white'}
          />
        )}
      </div>

      <div className="mt-6">
        {isMyProfile || isFollowing ? (
          posts?.length === 0 && !postsLoading ? (
            <p className="text-center text-gray-500 mt-4">
              No posts to display.
            </p>
          ) : (
            posts.map((post) => <Post key={post.id} post={post} />)
          )
        ) : (
          <div className="text-center py-12">
            <h3>Please follow the user to see the posts</h3>
          </div>
        )}
      </div>

      <FollowersFollowingModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalTitle={modalTitle}
        modalList={modalList}
      />

      <PostUploadModal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default ProfilePage;
