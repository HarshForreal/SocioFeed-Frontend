// store/thunks/postsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async ({ userId, skip = 0, take = 10 }, thunkAPI) => {
    try {
      const res = await api.get(
        `/user/posts/${userId}?skip=${skip}&take=${take}`
      );
      return res.data.posts;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const uploadAndCreatePost = createAsyncThunk(
  'posts/uploadAndCreatePost',
  async ({ image, caption }, thunkAPI) => {
    try {
      // Step 1: Upload image
      const formData = new FormData();
      formData.append('file', image);

      const uploadResponse = await api.post('/post/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Step 2: Create post
      const postData = {
        content: caption,
        imageUrls: uploadResponse.data.imageUrls,
      };

      const postResponse = await api.post('/post/create', postData);
      return postResponse.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
