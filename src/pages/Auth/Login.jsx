import { useState } from 'react';
import InputField from '../../components/common/Input/InputField';
import Button from '../../components/common/Button/Button';
import FormContainer from '../../components/common/FormContainer/FormContainer';
import { ArrowRight } from 'lucide-react';
import useLogin from '../../hooks/useLogin';
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, loading, errors } = useLogin(); // Hook should follow same shape as useSignup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(formData);
  };

  return (
    <div>
      <FormContainer
        title="Login to your account."
        subtitle="Welcome back!"
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
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-md rounded-2xl shadow-md px-6 py-8 border border-gray-300"
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

          {/* Forgot Password */}
          <div className="text-right mb-4 mt-[-8px]">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Forgot Password?
            </a>
          </div>

          {/* Server Error */}
          {errors.server && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errors.server}
            </p>
          )}

          <Button
            type="submit"
            text={loading ? 'Logging in...' : 'Login'}
            color="bg-[#0d1128]"
            className="w-full font-semibold mt-2 flex items-center justify-center gap-1"
            textColor="text-white"
          />
        </form>
      </FormContainer>
    </div>
  );
};

export default Login;
