import { useState, useEffect } from 'react';
import { activateAccount } from '../api/auth';

const useAccountActivation = (token) => {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const res = await activateAccount(token);
        console.log(res.message);
        setStatus('success');
      } catch (err) {
        console.error(err.response?.data?.message || err.message);
        setStatus('error');
      }
    };

    if (token) verifyAccount();
  }, [token]);

  return status;
};

export default useAccountActivation;
