import faker from 'faker';

import { RequiredFieldError } from '@validation/errors';
import { RequiredFieldValidator } from './required-field-validator';

describe('RequiredFieldValidator', () => {
  it('should return an error if field is empty', () => {
    const sut = new RequiredFieldValidator('email');

    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });

  it('should return falsy if field is not empty', () => {
    const sut = new RequiredFieldValidator('email');

    const error = sut.validate(faker.random.word());
    expect(error).toBeFalsy();
  });
});
