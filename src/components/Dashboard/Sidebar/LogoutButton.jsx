import { Power } from 'lucide-react';
import { Button } from '@mui/material';
import useLogout from '../../../hooks/useLogout';

const LogoutButton = () => {
  const { logout, loading } = useLogout();

  return (
    <div className="p-4 border-t border-gray-100">
      <Button
        onClick={logout}
        disabled={loading}
        variant="contained"
        style={{
          backgroundColor: '#ffe5e5',
          color: '#dc2626',
          textTransform: 'none',
          padding: '8px 16px',
          boxShadow: 'none',
          borderRadius: '13px',
          fontFamily: 'geist',
        }}
        startIcon={<Power size={20} color="#dc2626" />}
      >
        {loading ? 'Logging out...' : 'Log Out'}
      </Button>
    </div>
  );
};

export default LogoutButton;
