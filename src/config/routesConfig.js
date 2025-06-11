// src/routes/routesConfig.js

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
