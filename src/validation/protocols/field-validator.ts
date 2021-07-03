export interface FieldValidator {
  field: string;
  validate(value: string): Error;
}
