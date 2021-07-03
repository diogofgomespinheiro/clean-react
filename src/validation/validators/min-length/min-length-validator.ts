import { FieldValidator } from '@validation/protocols';
import { InvalidFieldError } from '@validation/errors';

export class MinLengthValidator implements FieldValidator {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(value: string): Error {
    return new InvalidFieldError(
      this.field,
      `This field must have at least ${this.minLength} characters`
    );
  }
}
