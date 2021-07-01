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

const Login: React.FC<LoginProps> = ({ authenticator, validator }) => {
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
    !(
      Object.values(formState.formData).find(item => item.error) ||
      formState.error
    );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (formState.isLoading || !isFormValid()) return;
      setFormState(oldState => ({ ...oldState, isLoading: true }));

      const { formData } = formState;
      const { email, password } = formData;
      const account = await authenticator.auth({
        email: email.value,
        password: password.value
      });

      localStorage.setItem('accessToken', account.accessToken);
    } catch (error) {
      setFormState(oldState => ({
        ...oldState,
        isLoading: false,
        error: error.message
      }));
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormProvider setFormState={setFormState} formState={formState}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={!isFormValid()}
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
