import { RequiredFieldError } from '@validation/errors';
import { FieldValidator } from '@validation/protocols';

export class RequiredFieldValidator implements FieldValidator {
  constructor(readonly field: string) {}

  validate(value: string): Error {
    return new RequiredFieldError();
  }
}
