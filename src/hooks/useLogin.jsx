import { useState } from 'react';
import { loginUser } from '../api/auth/auth';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/handleApiError';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const login = async ({ email, password }) => {
  setErrors({});
  try {
    setLoading(true);
    // Rename 'email' to 'usernameOrEmail' to match backend
    const res = await loginUser({ usernameOrEmail: email, password });
    console.log('Login success:', res.data);
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
