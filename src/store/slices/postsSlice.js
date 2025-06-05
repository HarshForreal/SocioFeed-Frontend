import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/client';

// Async thunk to fetch posts of a user by userId (or current user)
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

// Async thunk to handle image upload and create post
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

      // Step 2: Create post with uploaded image URLs
      const postData = {
        content: caption,
        imageUrls: uploadResponse.data.imageUrls, // Use the returned image URLs
      };

      // Step 3: Post the created post to the server
      const postResponse = await api.post('/post/create', postData);

      return postResponse.data; // return the newly created post
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
      state.error = null;
      state.loading = false;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const idx = state.posts.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.posts[idx] = action.payload;
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // Existing reducers for fetching user posts
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // New reducers for upload and create post functionality
    builder
      .addCase(uploadAndCreatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAndCreatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload); // Add the new post to the posts list
      })
      .addCase(uploadAndCreatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPosts, addPost, updatePost, removePost } =
  postsSlice.actions;

export default postsSlice.reducer;
