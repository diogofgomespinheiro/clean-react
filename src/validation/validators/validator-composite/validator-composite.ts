import { Validator } from '@presentation/protocols';
import { FieldValidator } from '@validation/protocols';

export class ValidatorComposite implements Validator {
  constructor(private readonly validators: FieldValidator[]) {}

  validate(fieldName: string, fieldValue: string): string {
    const fieldValidators = this.validators.filter(
      validator => validator.field === fieldName
    );

    for (const fieldValidator of fieldValidators) {
      const error = fieldValidator.validate(fieldValue);

      if (error) {
        return error.message;
      }
    }

    return null;
  }
}
