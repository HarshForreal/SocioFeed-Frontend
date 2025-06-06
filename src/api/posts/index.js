import api from '../client';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const uploadPostImages = (formData, config = {}) =>
  api.post(apiEndpoints.post.UPLOAD_IMAGES, formData, config);

export const createPost = (data) =>
  api.post(apiEndpoints.post.CREATE_POST, data);

export const fetchUserPosts = (userId, skip = 0, take = 10) =>
  api.get(apiEndpoints.post.USER_POSTS(userId), {
    params: { skip, take },
  });

export const fetchFeedPosts = (page = 1, limit = 10) =>
  api.get(apiEndpoints.post.FEED_POSTS, {
    params: { page, limit },
  });

export const likePost = (postId) =>
  api.patch(apiEndpoints.post.LIKE_POST(postId));

export const savePost = (postId) =>
  api.post(apiEndpoints.post.SAVE_POST(postId));

export const unsavePost = (postId) =>
  api.delete(apiEndpoints.post.UNSAVE_POST(postId));

export const addComment = (postId, content) =>
  api.post(apiEndpoints.post.ADD_COMMENT(postId), { content });

export const getComments = (postId) =>
  api.get(apiEndpoints.post.GET_COMMENTS(postId));

export const editComment = (commentId, content) =>
  api.put(apiEndpoints.post.EDIT_COMMENT(commentId), { content });

export const deleteComment = (commentId) =>
  api.delete(apiEndpoints.post.DELETE_COMMENT(commentId));

export const fetchSavedPosts = (skip = 0, take = 10) =>
  api.get(apiEndpoints.post.GET_SAVED_POSTS, {
    params: { skip, take },
  });
