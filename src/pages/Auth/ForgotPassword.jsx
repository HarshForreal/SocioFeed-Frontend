import { useState } from 'react';
import InputField from '../../components/common/Input/InputField';
import Button from '../../components/common/Button/Button';
import FormContainer from '../../components/common/FormContainer/FormContainer';
import { requestPasswordReset } from '../../api/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const res = await requestPasswordReset(email);
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer
      title="Reset Your Password"
      subtitle="We’ll send a password reset link to your email."
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-md px-6 py-8 border border-gray-300"
      >
        <InputField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          error={error}
        />

        {message && (
          <p className="text-green-600 text-sm mt-2 text-center">{message}</p>
        )}

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}

        <Button
          type="submit"
          text={loading ? 'Sending...' : 'Send Reset Link'}
          color="bg-[#0d1128]"
          className="w-full font-semibold mt-2"
          textColor="text-white"
        />
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
