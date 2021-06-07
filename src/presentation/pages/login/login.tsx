import * as React from 'react';

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@presentation/components';
import { FormProvider, FormStateProps } from '@presentation/contexts';
import Styles from './styles.scss';

const Login: React.FC = () => {
  const [state] = React.useState<FormStateProps>({
    isLoading: false,
    errorMessage: ''
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormProvider {...state}>
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
      </FormProvider>
      <Footer />
    </div>
  );
};

export default Login;
