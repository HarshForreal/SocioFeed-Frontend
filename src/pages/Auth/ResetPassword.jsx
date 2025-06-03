import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InputField from '../../components/common/Input/InputField';
import Button from '../../components/common/Button/Button';
import FormContainer from '../../components/common/FormContainer/FormContainer';
import { resetPassword } from '../../api/auth';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const res = await resetPassword(token, formData);
      setMessage(res.data.message);

      // Redirect to login after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setErrors({
        server: err.response?.data?.message || 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer
      title="Reset Your Password"
      subtitle="Set a new password to access your account"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-md px-6 py-8 border border-gray-300"
      >
        <InputField
          label="New Password"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          error={errors.newPassword}
        />
        <InputField
          label="Confirm New Password"
          type="password"
          name="confirmNewPassword"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          error={errors.confirmNewPassword}
        />

        {errors.server && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errors.server}
          </p>
        )}
        {message && (
          <p className="text-green-600 text-sm text-center mt-2">{message}</p>
        )}

        <Button
          type="submit"
          text={loading ? 'Resetting...' : 'Reset Password'}
          color="bg-[#0d1128]"
          className="w-full font-semibold mt-2"
          textColor="text-white"
        />
      </form>
    </FormContainer>
  );
};

export default ResetPassword;
