import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Landing from '../pages/Home/Landing';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Activate from '../pages/Auth/Activate';
import ActivatePrompt from '../pages/Auth/ActivatePrompt';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';

import ScrollPage from '../pages/Dashboard/ScrollPage';
import InboxPage from '../pages/Dashboard/InboxPage';
import SearchPage from '../pages/Dashboard/SearchPage';
import BookmarkPage from '../pages/Dashboard/BookmarkPage';
import ProfilePage from '../pages/Dashboard/ProfilePage';

import DashboardLayout from '../layouts/DashboardLayout';
import PrivateRoute from '../components/Route/PrivateRoute';

import { verifySession } from '../store/slices/authSlice';
import { fetchUserProfile } from '../store/slices/userSlice';
const AppRouter = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);

  useEffect(() => {
    // Fetch user profile only when auth user is available
    if (authUser?.username) {
      dispatch(fetchUserProfile(authUser.username));
    }
  }, [authUser?.username, dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/activate" element={<ActivatePrompt />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protected Routes inside layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<ScrollPage />} />
          <Route path="inbox" element={<InboxPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="bookmarks" element={<BookmarkPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
