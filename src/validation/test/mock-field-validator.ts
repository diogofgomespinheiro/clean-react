import { FieldValidator } from '@validation/protocols';

export class FieldValidatorSpy implements FieldValidator {
  error: Error = null;

  constructor(readonly field: string) {}

  validate(value: string): Error {
    return this.error;
  }
}
