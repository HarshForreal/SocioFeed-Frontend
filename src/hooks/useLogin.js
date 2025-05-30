import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../api/auth/auth';
import { handleApiError } from '../utils/handleApiError';
import { setUser, setIsLoggedIn } from '../store/slices/authSlice';

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

      // ✅ Dispatch Redux updates
      dispatch(setUser(res.data.user));
      dispatch(setIsLoggedIn(true));

      console.log('📦 setUser dispatched:', res.data.user);
      console.log('📦 setIsLoggedIn dispatched: true');

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
