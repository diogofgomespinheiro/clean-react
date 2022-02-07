export class UnexpectedError extends Error {
	constructor() {
		super('Something wrong happen. Please try again!');
		this.name = 'UnexpectedError';
	}
}
