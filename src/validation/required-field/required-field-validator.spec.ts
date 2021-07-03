import { RequiredFieldError } from '@validation/errors';
import { RequiredFieldValidator } from './required-field-validator';

describe('RequiredFieldValidator', () => {
  it('should return an error if field is empty', () => {
    const sut = new RequiredFieldValidator('email');

    const error = sut.validate('');
    expect(error).toEqual(new RequiredFieldError());
  });
});
