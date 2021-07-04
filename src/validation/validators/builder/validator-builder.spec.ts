import faker from 'faker';

import {
  RequiredFieldValidator,
  EmailValidator,
  MinLengthValidator
} from '@validation/validators';
import { ValidatorBuilder as sut } from './validator-builder';

describe('ValidatorBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const fieldName = faker.database.column();
    const validators = sut.field(fieldName).required().build();
    expect(validators).toEqual([new RequiredFieldValidator(fieldName)]);
  });

  it('should return EmailValidator', () => {
    const fieldName = faker.database.column();
    const validators = sut.field(fieldName).email().build();
    expect(validators).toEqual([new EmailValidator(fieldName)]);
  });

  it('should return MinLengthValidator', () => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number(5);
    const validators = sut.field(fieldName).min(minLength).build();
    expect(validators).toEqual([new MinLengthValidator(fieldName, minLength)]);
  });

  it('should return a list of validators', () => {
    const fieldName = faker.database.column();
    const minLength = faker.datatype.number(5);
    const validators = sut
      .field(fieldName)
      .required()
      .min(minLength)
      .email()
      .build();

    expect(validators).toEqual([
      new RequiredFieldValidator(fieldName),
      new MinLengthValidator(fieldName, minLength),
      new EmailValidator(fieldName)
    ]);
  });
});
