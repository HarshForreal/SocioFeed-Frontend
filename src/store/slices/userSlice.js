import { createSlice } from '@reduxjs/toolkit';
import {
  fetchUserProfile,
  followUser,
  unfollowUser,
  fetchFollowersList,
  fetchFollowingList,
} from '../thunks/userThunks';

const initialState = {
  profile: null,
  followers: [],
  following: [],
  isFollowing: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setIsFollowing: (state, action) => {
      state.isFollowing = action.payload;
    },
    setFollowersList: (state, action) => {
      state.followers = action.payload;
    },
    setFollowingList: (state, action) => {
      state.following = action.payload;
    },
    clearProfilePosts: (state) => {
      if (state.profile) {
        state.profile.posts = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isFollowing = action.payload.isFollowing ?? false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(followUser.fulfilled, (state) => {
        state.isFollowing = true;
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.isFollowing = false;
      })

      .addCase(fetchFollowersList.fulfilled, (state, action) => {
        state.followers = action.payload;
      })

      .addCase(fetchFollowingList.fulfilled, (state, action) => {
        state.following = action.payload;
      });
  },
});

export const {
  setProfile,
  setIsFollowing,
  setFollowersList,
  setFollowingList,
  clearProfilePosts,
} = userSlice.actions;
export default userSlice.reducer;
