import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';

import { ValidatorSpy } from '@presentation/test';
import Login from './login';

type SutTypes = {
  sut: RenderResult;
  validatorSpy: ValidatorSpy;
};

const makeSut = (): SutTypes => {
  const validatorSpy = new ValidatorSpy();
  const sut = render(<Login validator={validatorSpy} />);

  return {
    sut,
    validatorSpy
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

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validatorSpy.fieldName).toBe('email');
    expect(validatorSpy.fieldValue).toBe('any_email');
  });

  it('should call validator with correct password', () => {
    const { validatorSpy } = makeSut();

    const passwordInput = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });
    expect(validatorSpy.fieldName).toBe('password');
    expect(validatorSpy.fieldValue).toBe('any_password');
  });
});
