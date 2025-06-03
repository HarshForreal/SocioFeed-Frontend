import { useState } from 'react';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '../utils/handleApiError';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const signup = async ({ username, email, password, confirmPassword }) => {
    setErrors({});
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    try {
      setLoading(true);
      await registerUser({ username, email, password, confirmPassword });
      navigate('/activate');
    } catch (err) {
      const msg = handleApiError(err, 'Something went wrong');
      setErrors({ server: msg });
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, errors };
};

export default useSignup;
