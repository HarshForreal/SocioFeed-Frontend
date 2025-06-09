import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserProfile,
  followUser as followUserApi,
  unfollowUser as unfollowUserApi,
} from '../../api/user/index';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (username, thunkAPI) => {
    try {
      const response = await getUserProfile(username);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const followUser = createAsyncThunk(
  'user/followUser',
  async (targetUserId, thunkAPI) => {
    try {
      const res = await followUserApi(targetUserId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to follow user'
      );
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (targetUserId, thunkAPI) => {
    try {
      const res = await unfollowUserApi(targetUserId);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to unfollow user'
      );
    }
  }
);
