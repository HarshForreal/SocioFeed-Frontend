import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Landing from '../pages/Home/Landing';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Activate from '../pages/Auth/Activate';
import ActivatePrompt from '../pages/Auth/ActivatePrompt.jsx';
import ForgotPassword from '../pages/Auth/ForgotPassword.jsx';
import ResetPassword from '../pages/Auth/ResetPassword.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';
import { verifySession } from '../store/slices/authSlice.js';
const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifySession());
  }, [dispatch]);
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

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
