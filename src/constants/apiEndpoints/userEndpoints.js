const userEndpoints = {
  GET_PROFILE: (username) => `/user/profile/${username}`,
  EDIT_PROFILE: '/user/profile/edit',
  AVATAR_UPLOAD: '/user/avatar-upload',
  SEARCH: '/user/search',
  FOLLOW: (userId) => `/user/follow/${userId}`,
  UNFOLLOW: (userId) => `/user/unfollow/${userId}`,
  GET_FOLLOWING: '/user/following',
  GET_FOLLOWERS: '/user/followers', // New endpoint to get followers
};

export default userEndpoints;
