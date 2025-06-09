import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../api/auth';
import { clearAuth } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/handleApiError';
import { verifySession } from '../store/thunks/authThunks';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      localStorage.removeItem('token');
      dispatch(clearAuth());
      await dispatch(verifySession()); // force refresh auth state to logged out

      console.log('🧹 Cleared auth state and token on logout');
      navigate('/login');
    } catch (err) {
      const msg = handleApiError(err, 'Logout failed, please try again.');
      console.error('❌ Logout error:', msg);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading };
};

export default useLogout;
