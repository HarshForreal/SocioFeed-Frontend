import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Home/Landing';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';

import Activate from '../pages/Auth/Activate';
import ActivatePrompt from '../pages/Auth/ActivatePrompt.jsx';
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/activate/:token" element={<Activate />} />
        <Route path="/activate" element={<ActivatePrompt />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
