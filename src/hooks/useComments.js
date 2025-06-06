// hooks/useComments.js
import { useState, useEffect } from 'react';
import { getComments, addComment } from '../api/posts';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await getComments(postId);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async (content) => {
    try {
      const res = await addComment(postId, content);
      await fetchComments();
      return res.data;
    } catch (err) {
      console.error('Failed to add comment:', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return {
    comments,
    loading,
    fetchComments,
    submitComment,
  };
};
