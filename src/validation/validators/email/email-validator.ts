import { FieldValidator } from '@validation/protocols';
import { InvalidFieldError } from '@validation/errors';

export class EmailValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return new InvalidFieldError(this.field);
  }
}
