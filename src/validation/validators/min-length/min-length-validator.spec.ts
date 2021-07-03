import faker from 'faker';

import { InvalidFieldError } from '@validation/errors';
import { MinLengthValidator } from './min-length-validator';

type SutTypes = {
  fieldName: string;
  minLength: number;
  sut: MinLengthValidator;
};

const makeSut = (
  fieldName = faker.random.word(),
  minLength = faker.datatype.number(10)
): SutTypes => ({
  fieldName,
  minLength,
  sut: new MinLengthValidator(fieldName, minLength)
});

describe('MinLengthValidato', () => {
  it('should return error if value is invalid', () => {
    const { fieldName, minLength, sut } = makeSut();

    const error = sut.validate(faker.datatype.string(minLength - 1));
    expect(error).toEqual(
      new InvalidFieldError(
        fieldName,
        `This field must have at least ${minLength} characters`
      )
    );
  });

  it('should return falsy if field is valid', () => {
    const { minLength, sut } = makeSut();

    const error = sut.validate(faker.datatype.string(minLength));
    expect(error).toBeFalsy();
  });
});
