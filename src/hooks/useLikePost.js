import { useEffect, useState } from 'react';
import { likePost } from '../api/posts/index';

export const useLikePost = (
  postId,
  initialLikesCount = 0,
  userId,
  likes = []
) => {
  const [likesCount, setLikesCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  // ✅ Set isLiked based on the initial likes array
  useEffect(() => {
    if (likes && Array.isArray(likes)) {
      setIsLiked(likes.some((like) => like.userId === userId));
    }
  }, [likes, userId]);

  const toggleLike = async () => {
    if (!postId || !userId) return;
    try {
      setIsLiking(true);

      const { data } = await likePost(postId);
      console.log('Data', data);

      if (data?.likes) {
        setLikesCount(data.likes.length);
        setIsLiked(data.likes.some((like) => like.userId === userId));
      } else if (typeof data.likesCount === 'number') {
        setLikesCount(data.likesCount);
        setIsLiked((prev) => !prev);
      } else {
        // fallback
        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        setIsLiked((prev) => !prev);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    } finally {
      setIsLiking(false);
    }
  };

  return { isLiked, likesCount, isLiking, toggleLike };
};
