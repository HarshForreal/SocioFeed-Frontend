// src/pages/Auth/Activate.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import StatusMessage from '../../components/common/StatusMessage/StatusMessage';
import useAccountActivation from '../../hooks/useAccountActivation';

const Activate = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const status = useAccountActivation(token);

  useEffect(() => {
    if (status === 'success') {
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [status, navigate]);

  const messages = {
    loading: 'Verifying...',
    success: 'Account activated! Redirecting to login...',
    error: 'Invalid or expired activation link.',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <StatusMessage status={status} message={messages[status]} />{' '}
    </div>
  );
};

export default Activate;
