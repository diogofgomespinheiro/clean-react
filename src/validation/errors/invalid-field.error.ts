export class InvalidFieldError extends Error {
  constructor(fieldName: string, message = `This ${fieldName} is invalid!`) {
    super(message);
    this.name = 'InvalidFieldError';
  }
}
