// src/routes/AppRouter.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuthSession from '../hooks/useAuthSession';

import { publicRoutes, protectedRoutes } from '../config/routesConfig.jsx';

import PrivateRoute from '../components/Route/PrivateRoute';
import DashboardLayout from '../layouts/DashboardLayout';

const AppRouter = () => {
  const authUser = useSelector((state) => state.auth.user);

  useAuthSession(authUser);

  return (
    <Router>
      <Routes>
        {/* public routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          {protectedRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
