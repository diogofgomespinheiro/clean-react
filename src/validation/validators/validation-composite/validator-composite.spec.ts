import faker from 'faker';

import { FieldValidatorSpy } from '@validation/test';
import { ValidatorComposite } from './validator-composite';

type SutTypes = {
  sut: ValidatorComposite;
  fieldValidatorSpies: FieldValidatorSpy[];
};

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidatorSpies = [
    new FieldValidatorSpy(fieldName),
    new FieldValidatorSpy(fieldName)
  ];
  const sut = new ValidatorComposite(fieldValidatorSpies);

  return { sut, fieldValidatorSpies };
};

describe('ValidatorComposite', () => {
  it('should return error if any validation fails', () => {
    const fieldName = faker.database.column();
    const { sut, fieldValidatorSpies } = makeSut(fieldName);
    fieldValidatorSpies[0].error = new Error(faker.random.words());
    fieldValidatorSpies[1].error = new Error(faker.random.words());

    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBe(fieldValidatorSpies[0].error.message);
  });

  it('should return falsy if all validations are valid', () => {
    const fieldName = faker.database.column();
    const { sut } = makeSut(fieldName);

    const error = sut.validate(fieldName, faker.random.word());
    expect(error).toBeFalsy();
  });
});
