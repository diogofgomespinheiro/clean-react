import * as React from 'react';
import { render, screen } from '@testing-library/react';

import Login from './login';

describe('Login Page', () => {
  it('should start with initial state', () => {
    render(<Login />);

    const errorWrap = screen.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = screen.getByRole('button', {
      name: /login/i
    }) as HTMLButtonElement;
    expect(submitButton).toHaveAttribute('disabled');
  });
});
