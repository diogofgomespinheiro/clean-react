import { Validator } from '@presentation/protocols';

export class ValidatorSpy implements Validator {
  errorMessage: string;

  fieldName: string;

  fieldValue: string;

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}
