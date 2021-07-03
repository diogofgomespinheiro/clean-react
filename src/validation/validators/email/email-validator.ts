import { FieldValidator } from '@validation/protocols';
import { InvalidFieldError } from '@validation/errors';

export class EmailValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    return (
      value && !emailRegex.test(value) && new InvalidFieldError(this.field)
    );
  }
}
