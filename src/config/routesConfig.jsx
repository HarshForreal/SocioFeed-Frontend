// src/routes/routesConfig.js
import Landing from '../pages/Home/Landing';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Activate from '../pages/Auth/Activate';
import ActivatePrompt from '../pages/Auth/ActivatePrompt';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import ScrollPage from '../pages/Dashboard/ScrollPage';
import ChatPage from '../pages/Dashboard/ChatPage';
import SearchPage from '../pages/Dashboard/SearchPage';
import BookmarkPage from '../pages/Dashboard/BookmarkPage';
import ProfilePage from '../pages/Dashboard/ProfilePage';

export const publicRoutes = [
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/activate/:token', element: <Activate /> },
  { path: '/activate', element: <ActivatePrompt /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password/:token', element: <ResetPassword /> },
];

export const protectedRoutes = [
  { path: 'dashboard', element: <ScrollPage /> },
  { path: 'search', element: <SearchPage /> },
  { path: 'bookmarks', element: <BookmarkPage /> },
  { path: 'profile/:username', element: <ProfilePage /> },
  { path: 'chat/*', element: <ChatPage /> },
  { path: 'chat/:username', element: <ChatPage /> },
];
