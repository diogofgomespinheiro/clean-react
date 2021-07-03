export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`This ${fieldName} is invalid!`);
    this.name = 'InvalidFieldError';
  }
}
