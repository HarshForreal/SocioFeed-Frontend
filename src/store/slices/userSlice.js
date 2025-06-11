// src/store/slices/userSlice.js

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
  followers: [], // Store followers list
  following: [], // Store following list
  isFollowing: false, // For storing if the logged-in user is following the profile
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
      // Clear posts when user unfollows
      if (state.profile) {
        state.profile.posts = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        // Initialize isFollowing here based on the fetched data
        state.isFollowing = action.payload.isFollowing ?? false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle follow/unfollow actions
      .addCase(followUser.fulfilled, (state) => {
        state.isFollowing = true; // Update to following when follow action is successful
      })
      .addCase(unfollowUser.fulfilled, (state) => {
        state.isFollowing = false; // Update to not following when unfollow action is successful
      })

      // Handle fetching followers list
      .addCase(fetchFollowersList.fulfilled, (state, action) => {
        state.followers = action.payload;
      })

      // Handle fetching following list
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
