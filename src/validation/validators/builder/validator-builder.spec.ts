import { RequiredFieldValidator } from '@validation/validators';
import { ValidatorBuilder as sut } from './validator-builder';

describe('ValidatorBuilder', () => {
  it('should return RequiredFieldValidator', () => {
    const validators = sut.field('any_field').required().build();

    expect(validators).toEqual([new RequiredFieldValidator('any_field')]);
  });
});
