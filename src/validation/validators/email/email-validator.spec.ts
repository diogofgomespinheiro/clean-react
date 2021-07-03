import faker from 'faker';

import { InvalidFieldError } from '@validation/errors';
import { EmailValidator } from './email-validator';

const makeSut = (field = faker.random.word()): EmailValidator =>
  new EmailValidator(field);

describe('EmailValidator', () => {
  it('should return error if email is invalid', () => {
    const field = faker.random.word();
    const sut = makeSut(field);

    const error = sut.validate(faker.random.word());
    expect(error).toEqual(new InvalidFieldError(field));
  });

  it('should return falsy if email is valid', () => {
    const sut = makeSut();

    const error = sut.validate(faker.internet.email());
    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const sut = makeSut();

    const error = sut.validate('');
    expect(error).toBeFalsy();
  });
});
