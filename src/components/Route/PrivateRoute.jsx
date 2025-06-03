import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
