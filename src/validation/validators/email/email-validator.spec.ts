import { InvalidFieldError } from '@validation/errors';
import { EmailValidator } from './email-validator';

describe('EmailValidator', () => {
  it('should return error if email is invalid', () => {
    const sut = new EmailValidator('email');

    const error = sut.validate('');
    expect(error).toEqual(new InvalidFieldError('email'));
  });
});
