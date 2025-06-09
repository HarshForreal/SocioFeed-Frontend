import { createSlice } from '@reduxjs/toolkit';
import { fetchFeedPosts } from '../thunks/feedThunks';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    clearFeedPosts(state) {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedPosts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.posts = [...state.posts, ...action.payload];
          state.page += 1;
        }
      })
      .addCase(fetchFeedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearFeedPosts } = feedSlice.actions;
export default feedSlice.reducer;
