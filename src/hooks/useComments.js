// // hooks/useComments.js
// import { useState, useEffect } from 'react';
// import { getComments, addComment } from '../api/posts';

// export const useComments = (postId) => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchComments = async () => {
//     if (!postId) return;
//     try {
//       setLoading(true);
//       const res = await getComments(postId);
//       setComments(res.data.comments);
//     } catch (err) {
//       console.error('Failed to fetch comments:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitComment = async (content) => {
//     try {
//       const res = await addComment(postId, content);
//       await fetchComments();
//       return res.data;
//     } catch (err) {
//       console.error('Failed to add comment:', err);
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [postId]);

//   return {
//     comments,
//     loading,
//     fetchComments,
//     submitComment,
//   };
// };

// hooks/useComments.js
// import { useState, useEffect, useCallback } from 'react'; // Import useCallback
// import {
//   getComments,
//   addComment,
//   editComment as apiEditComment,
//   deleteComment as apiDeleteComment,
// } from '../api/posts'; // Alias to avoid naming conflicts

// export const useComments = (postId) => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null); // Added for error handling

//   const fetchComments = useCallback(async () => {
//     // Memoize fetchComments
//     if (!postId) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await getComments(postId);
//       setComments(res.data.comments);
//     } catch (err) {
//       console.error('Failed to fetch comments:', err);
//       setError(err.response?.data?.message || 'Failed to fetch comments');
//     } finally {
//       setLoading(false);
//     }
//   }, [postId]); // Dependency array for useCallback

//   const submitComment = async (content) => {
//     try {
//       const res = await addComment(postId, content);
//       await fetchComments(); // Refetch all comments to include the new one
//       return res.data;
//     } catch (err) {
//       console.error('Failed to add comment:', err);
//       setError(err.response?.data?.message || 'Failed to add comment');
//       throw err; // Re-throw to allow component to handle if needed
//     }
//   };

//   const handleEditComment = async (commentId, content) => {
//     try {
//       const res = await apiEditComment(commentId, content);
//       await fetchComments(); // Refetch all comments to update the edited one
//       return res.data; // Return updated comment data if needed
//     } catch (err) {
//       console.error('Failed to edit comment:', err);
//       setError(err.response?.data?.message || 'Failed to edit comment');
//       throw err;
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await apiDeleteComment(commentId);
//       await fetchComments(); // Refetch all comments to remove the deleted one
//     } catch (err) {
//       console.error('Failed to delete comment:', err);
//       setError(err.response?.data?.message || 'Failed to delete comment');
//       throw err;
//     }
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [fetchComments]); // Depend on memoized fetchComments

//   return {
//     comments,
//     loading,
//     error, // Expose error state
//     fetchComments,
//     submitComment,
//     handleEditComment, // Expose new functions
//     handleDeleteComment, // Expose new functions
//   };
// };

// hooks/useComments.js
import { useState, useEffect, useCallback } from 'react';
import {
  getComments,
  addComment,
  editComment as apiEditComment,
  deleteComment as apiDeleteComment,
} from '../api/posts'; // Alias to avoid naming conflicts

export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Added for error handling

  const fetchComments = useCallback(async () => {
    // Memoize fetchComments
    if (!postId) {
      setComments([]); // Clear comments if no postId
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
  }, [postId]); // Dependency array for useCallback

  const submitComment = async (content) => {
    try {
      const res = await addComment(postId, content);
      await fetchComments(); // Refetch all comments to include the new one
      return res.data;
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError(err.response?.data?.message || 'Failed to add comment');
      throw err; // Re-throw to allow component to handle if needed
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      const res = await apiEditComment(commentId, content);
      await fetchComments(); // Refetch all comments to update the edited one
      return res.data; // Return updated comment data if needed
    } catch (err) {
      console.error('Failed to edit comment:', err);
      setError(err.response?.data?.message || 'Failed to edit comment');
      throw err;
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await apiDeleteComment(commentId);
      await fetchComments(); // Refetch all comments to remove the deleted one
    } catch (err) {
      console.error('Failed to delete comment:', err);
      setError(err.response?.data?.message || 'Failed to delete comment');
      throw err;
    }
  };

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Depend on memoized fetchComments

  return {
    comments,
    loading,
    error, // Expose error state
    fetchComments,
    submitComment,
    handleEditComment, // Expose new functions
    handleDeleteComment, // Expose new functions
  };
};
