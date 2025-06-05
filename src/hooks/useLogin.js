import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { handleApiError } from '../utils/handleApiError';
import {
  setUser,
  setIsLoggedIn,
  verifySession,
} from '../store/slices/authSlice';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async ({ email, password }) => {
    setErrors({});
    try {
      setLoading(true);
      const res = await loginUser({ usernameOrEmail: email, password });
      console.log('✅ Login API success:', res.data);
      const token = res.data.token;
      localStorage.setItem('token', token);
      dispatch(setUser(res.data.user));
      dispatch(setIsLoggedIn(true));
      dispatch(verifySession());
      navigate('/dashboard');
    } catch (err) {
      const msg = handleApiError(err, 'Login Failed, Something went wrong');
      setErrors({ server: msg });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, errors };
};

export default useLogin;
