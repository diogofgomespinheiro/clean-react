import * as React from 'react';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
  cleanup
} from '@testing-library/react';

import { Validation } from '@presentation/protocols';
import Login from './login';

class ValidationSpy implements Validation {
  errorMessage: string;

  input: Record<string, unknown>;

  validate(input: Record<string, unknown>): string {
    this.input = input;
    return this.errorMessage;
  }
}

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);

  return {
    sut,
    validationSpy
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

  it('should call validation with correct email', () => {
    const { validationSpy } = makeSut();

    const emailInput = screen.getByTestId('email-input') as HTMLInputElement;
    fireEvent.input(emailInput, { target: { value: 'any_email' } });
    expect(validationSpy.input).toEqual({
      email: 'any_email'
    });
  });

  it('should call validation with correct password', () => {
    const { validationSpy } = makeSut();

    const passwordInput = screen.getByTestId(
      'password-input'
    ) as HTMLInputElement;
    fireEvent.input(passwordInput, { target: { value: 'any_password' } });
    expect(validationSpy.input).toEqual({
      password: 'any_password'
    });
  });
});
