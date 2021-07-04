import { FieldValidator } from '@validation/protocols';
import { EmailValidator, RequiredFieldValidator } from '@validation/validators';

export class ValidatorBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validators: FieldValidator[]
  ) {}

  static field(fieldName: string): ValidatorBuilder {
    return new ValidatorBuilder(fieldName, []);
  }

  required(): ValidatorBuilder {
    this.validators.push(new RequiredFieldValidator(this.fieldName));
    return this;
  }

  email(): ValidatorBuilder {
    this.validators.push(new EmailValidator(this.fieldName));
    return this;
  }

  build(): FieldValidator[] {
    return this.validators;
  }
}
