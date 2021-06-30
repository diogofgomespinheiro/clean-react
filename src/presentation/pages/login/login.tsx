import * as React from 'react';

import {
  LoginHeader,
  Input,
  FormStatus,
  Footer
} from '@presentation/components';
import { FormProvider, FormState } from '@presentation/contexts';
import { LoginProps } from './types';
import Styles from './styles.scss';

const Login: React.FC<LoginProps> = ({ validator }) => {
  const [formState, setFormState] = React.useState<FormState>({
    isLoading: false,
    formData: {
      email: {
        error: 'Required field*',
        value: ''
      },
      password: {
        error: 'Required field*',
        value: ''
      }
    },
    error: ''
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = evt;
    setFormState(oldState => ({
      ...oldState,
      formData: {
        ...oldState.formData,
        [name]: {
          ...oldState.formData[name],
          error: validator.validate(name, value)
        }
      }
    }));
  };

  const isFormValid = (): boolean =>
    Boolean(
      Object.values(formState.formData).find(item => item.error) ||
        formState.error
    );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setFormState(oldState => ({ ...oldState, isLoading: true }));
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormProvider setFormState={setFormState} formState={formState}>
        <form className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={handleInputChange}
          />
          <button
            className={Styles.submit}
            type="submit"
            disabled={isFormValid()}
          >
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
