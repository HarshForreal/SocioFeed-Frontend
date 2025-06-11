// src/store/thunks/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserProfile,
  followUser as followUserApi,
  unfollowUser as unfollowUserApi,
  fetchFollowersList as fetchFollowersListApi,
  fetchFollowingList as fetchFollowingListApi,
} from '../../api/user';
import {
  setProfile,
  setIsFollowing,
  setFollowersList,
  setFollowingList,
} from '../slices/userSlice';

// Fetch User Profile Thunk
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (username, { dispatch, thunkAPI }) => {
    try {
      const response = await getUserProfile(username);
      dispatch(setProfile(response.data)); // Dispatch profile data to Redux
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Follow User Thunk
export const followUser = createAsyncThunk(
  'user/followUser',
  async (targetUserId, { dispatch, thunkAPI }) => {
    try {
      const res = await followUserApi(targetUserId);

      // After successful follow, refresh the following list
      const followingResponse = await fetchFollowingListApi();
      dispatch(setFollowingList(followingResponse));

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Unfollow User Thunk
export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (targetUserId, { dispatch, thunkAPI }) => {
    try {
      const res = await unfollowUserApi(targetUserId);

      // After successful unfollow, refresh the following list
      const followingResponse = await fetchFollowingListApi();
      dispatch(setFollowingList(followingResponse));

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// Fetch Followers List Thunk
export const fetchFollowersList = createAsyncThunk(
  'user/fetchFollowersList',
  async (_, { dispatch, thunkAPI }) => {
    try {
      const response = await fetchFollowersListApi();
      dispatch(setFollowersList(response)); // Dispatch followers list to Redux
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Fetch Following List Thunk
export const fetchFollowingList = createAsyncThunk(
  'user/fetchFollowingList',
  async (_, { dispatch, thunkAPI }) => {
    try {
      const response = await fetchFollowingListApi();
      dispatch(setFollowingList(response)); // Dispatch following list to Redux
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
