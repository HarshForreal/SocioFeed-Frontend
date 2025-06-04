const postEndpoints = {
  UPLOAD_IMAGES: '/post/upload',
  CREATE_POST: '/post/create',
  USER_POSTS: (userId) => `/user/posts/${userId}`,
  FEED_POSTS: '/post/feed',
  LIKE_POST: (postId) => `/post/like/${postId}`,
  SAVE_POST: (postId) => `/post/save/${postId}`,
  UNSAVE_POST: (postId) => `/post/unsave/${postId}`,

  ADD_COMMENT: (postId) => `/post/${postId}/comment`,
  GET_COMMENTS: (postId) => `/post/${postId}/comments`,
  EDIT_COMMENT: (commentId) => `/post/comment/edit/${commentId}`,
  DELETE_COMMENT: (commentId) => `/post/comment/delete/${commentId}`,
};

export default postEndpoints;
