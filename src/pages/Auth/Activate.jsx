import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../api/client';

const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await axios.get(`/auth/activate/${token}`);
        console.log(res.data.message);
        setStatus('success');

        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
        setStatus('error');
      }
    };

    if (token) verifyAccount();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {status === 'loading' && (
        <h1 className="text-xl font-medium text-gray-600">Verifying...</h1>
      )}
      {status === 'success' && (
        <h1 className="text-xl font-medium text-green-600">
          Account activated! Redirecting to login...
        </h1>
      )}
      {status === 'error' && (
        <h1 className="text-xl font-medium text-red-600">
          Invalid or expired activation link.
        </h1>
      )}
    </div>
  );
};

export default Activate;
