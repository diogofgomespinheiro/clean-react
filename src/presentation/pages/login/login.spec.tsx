import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';
import faker from 'faker';

import { ValidatorSpy } from '@presentation/test';
import { Authentication, AuthenticationParams } from '@domain/usecases';
import { AccountModel } from '@domain/models';
import { mockAccountModel } from '@domain/test';
import Login from './login';

class AuthenticationSpy implements Authentication {
  account = mockAccountModel();

  params: AuthenticationParams;

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

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

    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe('Required field*');
    expect(emailStatus).toHaveTextContent('🔴');

    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Required field*');
    expect(passwordStatus).toHaveTextContent('🔴');
  });

  it('should call validator with correct email', () => {
    const { validatorSpy } = makeSut();
    const emailValue = faker.internet.email();

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: emailValue } });
    expect(validatorSpy.fieldName).toBe('email');
    expect(validatorSpy.fieldValue).toBe(emailValue);
  });

  it('should call validator with correct password', () => {
    const { validatorSpy } = makeSut();
    const passwordValue = faker.internet.password();

    const passwordInput = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: passwordValue } });
    expect(validatorSpy.fieldName).toBe('password');
    expect(validatorSpy.fieldValue).toBe(passwordValue);
  });

  it('should show email error if validations fails', () => {
    const { validatorSpy } = makeSut({ validationError: faker.random.words() });

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe(validatorSpy.errorMessage);
    expect(emailStatus).toHaveTextContent('🔴');
  });

  it('should show password error if validations fails', () => {
    const { validatorSpy } = makeSut({ validationError: faker.random.words() });

    const passwordInput = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.email() }
    });
    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validatorSpy.errorMessage);
    expect(passwordStatus).toHaveTextContent('🔴');
  });

  it('should show valid email state if validation succeeds', () => {
    makeSut();

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const emailStatus = screen.getByTestId('email-status');
    expect(emailStatus.title).toBe("Everything's good!");
    expect(emailStatus).toHaveTextContent('🟢');
  });

  it('should show valid password state if validation succeeds', () => {
    makeSut();

    const passwordInput = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() }
    });

    const passwordStatus = screen.getByTestId('password-status');
    expect(passwordStatus.title).toBe("Everything's good!");
    expect(passwordStatus).toHaveTextContent('🟢');
  });

  it('should enable submit button if form is valid', () => {
    makeSut();

    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: faker.internet.email() }
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: faker.internet.password() }
    });

    const submitButton = screen.getByRole('button', {
      name: /login/i
    }) as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  it('should show spinner on submit', () => {
    makeSut();

    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: faker.internet.email() }
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: faker.internet.password() }
    });
    fireEvent.click(
      screen.getByRole('button', {
        name: /login/i
      })
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();
  });

  it('should call authentication with correct values', () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();

    fireEvent.input(screen.getByTestId('email-input'), {
      target: { value: email }
    });
    fireEvent.input(screen.getByTestId('password-input'), {
      target: { value: password }
    });
    fireEvent.click(
      screen.getByRole('button', {
        name: /login/i
      })
    );

    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });
});
