import faker from 'faker';

import { RequiredFieldError } from '@validation/errors';
import { RequiredFieldValidator } from './required-field-validator';

const makeSut = (): RequiredFieldValidator =>
  new RequiredFieldValidator(faker.database.column());

describe('RequiredFieldValidator', () => {
  it('should return an error if field is empty', () => {
    const sut = makeSut();

    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return falsy if field is not empty', () => {
    const sut = makeSut();

    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});
