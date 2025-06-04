// store/index.js (or wherever you configure the store)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import postsReducer from './slices/postsSlice';
import feedReducer from './slices/feedSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    posts: postsReducer,
    feed: feedReducer,
  },
});

export default store;
