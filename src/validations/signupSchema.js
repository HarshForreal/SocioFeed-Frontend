import * as yup from 'yup';
import { usernameRule, emailRule, passwordRule } from './common/rules';
const signupSchema = yup.object().shape({
  username: usernameRule,
  email: emailRule,
  password: passwordRule,
});

export default signupSchema;
