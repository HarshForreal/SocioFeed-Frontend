// store/slices/postsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserPosts,
  uploadAndCreatePost,
} from '../../store/thunks/postThunks';

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
      })
      .addCase(uploadAndCreatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAndCreatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
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
