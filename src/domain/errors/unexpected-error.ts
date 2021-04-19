export class UnexpectedError extends Error {
  constructor() {
    super('Something bad happen. Please try again.');
    this.name = 'UnexpectedError';
  }
}
