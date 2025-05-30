import * as yup from 'yup';

export const usernameRule = yup
  .string()
  .required('Username is required')
  .min(3, 'Username must be at least 3 characters');

export const emailRule = yup
  .string()
  .required('Email is required')
  .email('Invalid email format');

export const passwordRule = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[A-Z]/, 'Must contain an uppercase letter')
  .matches(/[a-z]/, 'Must contain a lowercase letter')
  .matches(/[0-9]/, 'Must contain a number')
  .matches(/[^a-zA-Z0-9]/, 'Must contain a special character');
