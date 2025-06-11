// src/api/user/index.js

import api from '../client';
import { apiEndpoints } from '../../constants/apiEndpoints';

export const getUserProfile = (username) =>
  api.get(apiEndpoints.user.GET_PROFILE(username));

export const editUserProfile = (data) =>
  api.put(apiEndpoints.user.EDIT_PROFILE, data);

export const uploadAvatar = (formData, config = {}) =>
  api.post(apiEndpoints.user.AVATAR_UPLOAD, formData, config);

export const searchUsers = (query) =>
  api.get(apiEndpoints.user.SEARCH, { params: { q: query } });

export const followUser = (userId) =>
  api.post(apiEndpoints.user.FOLLOW(userId));

export const unfollowUser = (userId) =>
  api.post(apiEndpoints.user.UNFOLLOW(userId));

export const fetchFollowersList = () =>
  api
    .get(apiEndpoints.user.GET_FOLLOWERS)
    .then((res) => res.data.followers || []);

export const fetchFollowingList = () =>
  api
    .get(apiEndpoints.user.GET_FOLLOWING)
    .then((res) => res.data.following || []);
