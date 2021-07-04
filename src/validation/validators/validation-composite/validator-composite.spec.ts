import { FieldValidatorSpy } from '@validation/test';
import { ValidatorComposite } from './validator-composite';

describe('ValidatorComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldValidatorSpy = new FieldValidatorSpy('any_field');
    const fieldValidatorSpy2 = new FieldValidatorSpy('any_field');
    fieldValidatorSpy2.error = new Error('any_error_message');

    const sut = new ValidatorComposite([fieldValidatorSpy, fieldValidatorSpy2]);
    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe(fieldValidatorSpy2.error.message);
  });
});
