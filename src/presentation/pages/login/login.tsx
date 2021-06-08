import * as React from 'react';

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@presentation/components';
import { FormProvider, FormState, ErrorState } from '@presentation/contexts';
import Styles from './styles.scss';

const Login: React.FC = () => {
  const [formState] = React.useState<FormState>({
    isLoading: false
  });

  const [errorState] = React.useState<ErrorState>({
    email: 'Required field*',
    password: 'Required field*',
    main: ''
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormProvider errorState={errorState} formState={formState}>
        <form className={Styles.form} action="">
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Enter your email" />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button className={Styles.submit} type="submit" disabled>
            Login
          </button>
          <span className={Styles.link}>Create an account</span>
          <FormStatus />
        </form>
      </FormProvider>
      <Footer />
    </div>
  );
};

export default Login;
