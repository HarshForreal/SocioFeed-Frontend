import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signupSchema from '../../validations/signupSchema';
import InputField from '../../components/common/Input/InputField';
import Button from '../../components/common/Button/Button';
import useSignup from '../../hooks/useSignup';
import AvatarGroup from '../../components/common/AvatarGroup/AvatarGroup';
import Form from '../../components/common/Form/Form';

const Signup = () => {
  const { signup, loading, errors: apiErrors } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data) => {
    await signup(data);
  };

  return (
    <Form
      title="Sign up & create your profile."
      subtitle={
        <>
          <AvatarGroup />
          Join 118,044+ peers.
        </>
      }
      onSubmit={handleSubmit(onSubmit)}
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
      <InputField
        label="Username"
        name="username"
        placeholder="Your username"
        error={errors.username?.message}
        {...register('username')}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="you@youremail.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputField
        label="Password"
        type="password"
        name="password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register('password')}
      />
      <InputField
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        placeholder="At least 8 characters"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {apiErrors?.server && (
        <p className="text-red-500 text-sm text-center mt-2">
          {apiErrors.server}
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
    </Form>
  );
};

export default Signup;
