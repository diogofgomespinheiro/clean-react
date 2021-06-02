import * as React from 'react';

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@presentation/components';
import Styles from './styles.scss';

const Login: React.FC = () => (
  <div className={Styles.login}>
    <LoginHeader />
    <form className={Styles.form} action="">
      <h2>Login</h2>
      <Input type="email" name="email" placeholder="Enter your email" />
      <Input
        type="password"
        name="password"
        placeholder="Enter your password"
      />
      <button className={Styles.submit} type="submit">
        Login
      </button>
      <span className={Styles.link}>Create an account</span>
      <FormStatus />
    </form>
    <Footer />
  </div>
);

export default Login;
