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

export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (username, { dispatch, thunkAPI }) => {
    try {
      const response = await getUserProfile(username);
      dispatch(setProfile(response.data));
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
  async (targetUserId, { dispatch, thunkAPI }) => {
    try {
      const res = await followUserApi(targetUserId);

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

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (targetUserId, { dispatch, thunkAPI }) => {
    try {
      const res = await unfollowUserApi(targetUserId);

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

export const fetchFollowersList = createAsyncThunk(
  'user/fetchFollowersList',
  async (_, { dispatch, thunkAPI }) => {
    try {
      const response = await fetchFollowersListApi();
      dispatch(setFollowersList(response));
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchFollowingList = createAsyncThunk(
  'user/fetchFollowingList',
  async (_, { dispatch, thunkAPI }) => {
    try {
      const response = await fetchFollowingListApi();
      dispatch(setFollowingList(response));
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
