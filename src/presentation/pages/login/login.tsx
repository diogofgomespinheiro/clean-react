import * as React from 'react';

import Spinner from '@presentation/components/spinner';
import Header from '@presentation/components/login-header';
import Footer from '@presentation/components/footer';
import Input from '@presentation/components/input';
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
      <div className={Styles.errorWrap}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Error</span>
      </div>
    </form>
    <Footer />
  </div>
);

export default Login;
