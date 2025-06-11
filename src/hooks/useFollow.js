import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  followUser as followUserThunk,
  unfollowUser as unfollowUserThunk,
} from '../store/thunks/userThunks';

const useFollow = (profileId, followingList) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profileId && followingList && followingList.length > 0) {
      const isUserFollowed = followingList.some(
        (user) => user.id === profileId
      );
      setIsFollowing(isUserFollowed);
      console.log('Checking follow status:', {
        profileId,
        isUserFollowed,
        followingList,
      });
    } else if (profileId && followingList && followingList.length === 0) {
      setIsFollowing(false);
    }
  }, [profileId, followingList]);

  const toggleFollow = async () => {
    if (!profileId) return;

    try {
      if (isFollowing) {
        await dispatch(unfollowUserThunk(profileId)).unwrap();
        setIsFollowing(false);
        console.log('Successfully unfollowed user');
      } else {
        await dispatch(followUserThunk(profileId)).unwrap();
        setIsFollowing(true);
        console.log('Successfully followed user');
      }
    } catch (error) {
      console.error('Failed to toggle follow status:', error);
    }
  };

  return { isFollowing, toggleFollow };
};

export default useFollow;
