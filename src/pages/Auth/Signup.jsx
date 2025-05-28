import { useState } from 'react';
import InputField from '../../components/common/Input/InputField';
import Button from '../../components/common/Button/Button';
import useSignup from '../../hooks/useSignup';
import FormContainer from '../../components/common/FormContainer/FormContainer';
import AvatarGroup from '../../components/common/AvatarGroup/AvatarGroup';
const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { signup, loading, errors } = useSignup();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <FormContainer
      title="Sign up & create your profile."
      subtitle={
        <>
          <AvatarGroup />
          Join 118,044+ peers.
        </>
      }
      bottomText={
        <>
          Already have a profile?{' '}
          <a
            href="/login"
            className="text-[#4e5b84] font-semibold hover:underline"
          >
            Log in
          </a>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-md px-6 py-8 border border-gray-300"
      >
        <InputField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Your username"
          error={errors.username}
        />
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@youremail.com"
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="At least 8 characters"
          error={errors.password}
        />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="At least 8 characters"
          error={errors.confirmPassword}
        />

        {errors.server && (
          <p className="text-red-500 text-sm text-center mt-2">
            {errors.server}
          </p>
        )}

        <Button
          text={loading ? 'Creating...' : 'Create Profile'}
          type="submit"
          color="bg-[#0d1128]"
          className="w-full font-semibold mt-2"
        />

        <p className="text-xs text-center text-gray-400 mt-4">
          By clicking "Create Profile" you agree to our{' '}
          <a href="#" className="underline hover:text-gray-600">
            Code of Conduct
          </a>
          ,{' '}
          <a href="#" className="underline hover:text-gray-600">
            Terms of Service
          </a>
          , and{' '}
          <a href="#" className="underline hover:text-gray-600">
            Privacy Policy
          </a>
          .
        </p>
      </form>
    </FormContainer>
  );
};

export default Signup;
