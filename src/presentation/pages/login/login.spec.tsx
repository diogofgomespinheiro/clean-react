import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';
import faker from 'faker';

import { AuthenticationSpy, ValidatorSpy } from '@presentation/test';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  validatorSpy: ValidatorSpy;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError?: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validatorSpy = new ValidatorSpy();
  const authenticationSpy = new AuthenticationSpy();
  validatorSpy.errorMessage = params?.validationError;
  const sut = render(
    <Login validator={validatorSpy} authenticator={authenticationSpy} />
  );

  return {
    sut,
    validatorSpy,
    authenticationSpy
  };
};

const fireInputEvent = (id: string, value: string): void => {
  const input = screen.getByTestId(id) as HTMLInputElement;
  fireEvent.input(input, {
    target: { value }
  });
};

const fireButtonClickEvent = (): void => {
  const submitButton = screen.getByRole('button', {
    name: /login/i
  });

  fireEvent.click(submitButton);
};

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  fireInputEvent('email-input', email);
  fireInputEvent('password-input', password);
  fireButtonClickEvent();
};

const verifyInputStatus = (
  fieldName: string,
  message = 'Required field*',
  statusIcon = '🔴'
): void => {
  const status = screen.getByTestId(`${fieldName}-status`);
  expect(status.title).toBe(message);
  expect(status).toHaveTextContent(statusIcon);
};

describe('Login Page', () => {
  afterEach(cleanup);

  it('should start with initial state', () => {
    makeSut();

    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = screen.getByRole('button', {
      name: /login/i
    }) as HTMLButtonElement;
    expect(submitButton).toHaveAttribute('disabled');

    verifyInputStatus('email');
    verifyInputStatus('password');
  });

  it('should call validator with correct email', () => {
    const { validatorSpy } = makeSut();
    const emailValue = faker.internet.email();
    fireInputEvent('email-input', emailValue);

    expect(validatorSpy.fieldName).toBe('email');
    expect(validatorSpy.fieldValue).toBe(emailValue);
  });

  it('should call validator with correct password', () => {
    const { validatorSpy } = makeSut();
    const passwordValue = faker.internet.password();
    fireInputEvent('password-input', passwordValue);

    expect(validatorSpy.fieldName).toBe('password');
    expect(validatorSpy.fieldValue).toBe(passwordValue);
  });

  it('should show email error if validations fails', () => {
    const { validatorSpy } = makeSut({ validationError: faker.random.words() });
    fireInputEvent('email-input', faker.internet.email());
    verifyInputStatus('email', validatorSpy.errorMessage);
  });

  it('should show password error if validations fails', () => {
    const { validatorSpy } = makeSut({ validationError: faker.random.words() });
    fireInputEvent('password-input', faker.internet.password());
    verifyInputStatus('password', validatorSpy.errorMessage);
  });

  it('should show valid email state if validation succeeds', () => {
    makeSut();
    fireInputEvent('email-input', faker.internet.email());
    verifyInputStatus('email', "Everything's good!", '🟢');
  });

  it('should show valid password state if validation succeeds', () => {
    makeSut();
    fireInputEvent('password-input', faker.internet.password());
    verifyInputStatus('password', "Everything's good!", '🟢');
  });

  it('should enable submit button if form is valid', () => {
    makeSut();
    fireInputEvent('email-input', faker.internet.email());
    fireInputEvent('password-input', faker.internet.password());

    const submitButton = screen.getByRole('button', {
      name: /login/i
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('should show spinner on submit', () => {
    makeSut();
    simulateValidSubmit();

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should call authentication with correct values', () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    simulateValidSubmit(email, password);

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });

  it('should call Authentication only once', () => {
    const { authenticationSpy } = makeSut();

    simulateValidSubmit();
    fireButtonClickEvent();

    expect(authenticationSpy.callsCount).toBe(1);
  });

  it('should not call Authentication if form is invalid', () => {
    const { authenticationSpy } = makeSut({
      validationError: faker.random.word()
    });
    fireInputEvent('email-input', faker.internet.email());
    fireEvent.submit(screen.getByTestId('form'));
    expect(authenticationSpy.callsCount).toBe(0);
  });
});
