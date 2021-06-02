import * as React from 'react';

import Spinner from '@presentation/components/spinner';
import Header from '@presentation/components/login-header';
import Logo from '@presentation/components/logo';
import Styles from './styles.scss';

const Login: React.FC = () => (
  <div className={Styles.login}>
    <Header />
    <form className={Styles.form} action="">
      <h2>Login</h2>
      <div className={Styles.inputWrap}>
        <input type="email" name="email" placeholder="Enter your email" />
        <span className={Styles.status}>🔴</span>
      </div>
      <div className={Styles.inputWrap}>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
        />
        <span className={Styles.status}>🔴</span>
      </div>
      <button className={Styles.submit} type="submit">
        Login
      </button>
      <span className={Styles.link}>Create an account</span>
      <div className={Styles.errorWrap}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Error</span>
      </div>
    </form>
    <footer className={Styles.footer} />
  </div>
);

export default Login;
