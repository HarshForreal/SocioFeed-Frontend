import { useState, useEffect, useCallback } from 'react';
import {
  getComments,
  addComment,
  editComment as apiEditComment,
  deleteComment as apiDeleteComment,
} from '../api/posts';

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!postId) {
      setComments([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await getComments(postId);
      setComments(res.data.comments);
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setError(err.response?.data?.message || 'Failed to fetch comments');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const submitComment = async (content) => {
    try {
      const res = await addComment(postId, content);
      await fetchComments();
      return res.data;
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError(err.response?.data?.message || 'Failed to add comment');
      throw err;
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      const res = await apiEditComment(commentId, content);
      await fetchComments();
      return res.data;
    } catch (err) {
      console.error('Failed to edit comment:', err);
      setError(err.response?.data?.message || 'Failed to edit comment');
      throw err;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await apiDeleteComment(commentId);
      await fetchComments();
    } catch (err) {
      console.error('Failed to delete comment:', err);
      setError(err.response?.data?.message || 'Failed to delete comment');
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return {
    comments,
    loading,
    error,
    fetchComments,
    submitComment,
    handleEditComment,
    handleDeleteComment,
  };
};
