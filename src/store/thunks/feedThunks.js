// store/thunks/feedThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchFeedPosts = createAsyncThunk(
  'feed/fetchFeedPosts',
  async ({ page = 1, limit = 10 }, thunkAPI) => {
    try {
      const res = await api.get(`/post/feed?page=${page}&limit=${limit}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
