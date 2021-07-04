import { FieldValidatorSpy } from '@validation/test';
import { ValidatorComposite } from './validator-composite';

describe('ValidatorComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidatorSpy = new FieldValidatorSpy('any_field');
    fieldValidatorSpy.error = new Error('first_error_message');
    const fieldValidatorSpy2 = new FieldValidatorSpy('any_field');
    fieldValidatorSpy2.error = new Error('second_error_message');

    const sut = new ValidatorComposite([fieldValidatorSpy, fieldValidatorSpy2]);
    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe(fieldValidatorSpy.error.message);
  });
});
