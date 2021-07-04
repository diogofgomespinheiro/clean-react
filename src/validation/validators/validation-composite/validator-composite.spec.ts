import { FieldValidatorSpy } from '@validation/test';
import { ValidatorComposite } from './validator-composite';

type SutTypes = {
  sut: ValidatorComposite;
  fieldValidatorSpies: FieldValidatorSpy[];
};

const makeSut = (): SutTypes => {
  const fieldValidatorSpies = [
    new FieldValidatorSpy('any_field'),
    new FieldValidatorSpy('any_field')
  ];
  const sut = new ValidatorComposite(fieldValidatorSpies);

  return { sut, fieldValidatorSpies };
};

describe('ValidatorComposite', () => {
  it('should return error if any validation fails', () => {
    const { sut, fieldValidatorSpies } = makeSut();
    fieldValidatorSpies[0].error = new Error('first_error_message');
    fieldValidatorSpies[1].error = new Error('second_error_message');

    const error = sut.validate('any_field', 'any_value');
    expect(error).toBe(fieldValidatorSpies[0].error.message);
  });
});
