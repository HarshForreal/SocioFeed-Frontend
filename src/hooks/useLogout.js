import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../api/auth/auth';
import { clearAuth } from '../store/slices/authSlice'; // Action to clear auth state
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/handleApiError';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      dispatch(clearAuth());
      navigate('/login');
    } catch (err) {
      const msg = handleApiError(err, 'Logout failed, please try again.');
      console.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;
