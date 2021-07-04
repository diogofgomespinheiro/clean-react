import {
  RequiredFieldValidator,
  EmailValidator,
  MinLengthValidator
} from '@validation/validators';
import { ValidatorBuilder as sut } from './validator-builder';

describe('ValidatorBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const validators = sut.field('any_field').required().build();
    expect(validators).toEqual([new RequiredFieldValidator('any_field')]);
  });

  it('should return EmailValidator', () => {
    const validators = sut.field('any_field').email().build();
    expect(validators).toEqual([new EmailValidator('any_field')]);
  });

  it('should return MinLengthValidator', () => {
    const minLength = 5;
    const validators = sut.field('any_field').min(minLength).build();
    expect(validators).toEqual([
      new MinLengthValidator('any_field', minLength)
    ]);
  });
});
