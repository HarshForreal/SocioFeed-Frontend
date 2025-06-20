import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import InputField from '../../components/common/Input/InputField';
import Button from '../../components/common/Button/Button';
import Form from '../../components/common/Form/Form';
import { ArrowRight } from 'lucide-react';
import useLogin from '../../hooks/useLogin';
import { useSelector } from 'react-redux';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, loading, errors } = useLogin();
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <Form
      title="Login to your account."
      subtitle="Welcome back!"
      onSubmit={handleSubmit}
      error={errors.server}
      bottomText={
        <>
          Don’t have a Sociofeed profile?{' '}
          <a
            href="/signup"
            className="text-[#4e5b84] font-semibold hover:underline"
          >
            Create One!
          </a>
        </>
      }
    >
      <InputField
        label="Email"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email or username"
        error={errors.email}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        error={errors.password}
        addonRight={<ArrowRight className="text-gray-400 w-5 h-5" />}
      />

      <div className="text-right mb-4 mt-[-8px]">
        <a
          href="/forgot-password"
          className="text-sm text-gray-500 hover:text-gray-700 font-medium"
        >
          Forgot Password?
        </a>
      </div>

      <Button
        type="submit"
        text={loading ? 'Logging in...' : 'Login'}
        color="bg-[#0d1128]"
        className="w-full font-semibold mt-2 flex items-center justify-center gap-1"
        textColor="text-white"
      />
    </Form>
  );
};

export default Login;
