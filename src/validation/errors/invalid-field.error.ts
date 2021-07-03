export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`The ${fieldName} is invalid!`);
    this.name = 'InvalidFieldError';
  }
}
