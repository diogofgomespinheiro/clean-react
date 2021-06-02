import * as React from 'react';

import Header from '@presentation/components/login-header';
import Footer from '@presentation/components/footer';
import Input from '@presentation/components/input';
import FormStatus from '@presentation/components/form-status';
import Styles from './styles.scss';

const Login: React.FC = () => (
  <div className={Styles.login}>
    <Header />
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
