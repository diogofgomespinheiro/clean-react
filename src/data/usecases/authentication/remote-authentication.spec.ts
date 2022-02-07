import faker from '@faker-js/faker';

import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { mockAuthenticationParams } from '@/domain/test';
import { HttpStatusCode } from '@/data/protocols';
import { HttpPostClientSpy } from '@/data/test';

import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
	sut: RemoteAuthentication;
	httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
	const httpPostClientSpy = new HttpPostClientSpy();
	const sut = new RemoteAuthentication(url, httpPostClientSpy);

	return {
		sut,
		httpPostClientSpy,
	};
};

describe('RemoteAuthentication', () => {
	it('should call HttpPostClient with the correct URL', async () => {
		const url = faker.internet.url();
		const { sut, httpPostClientSpy } = makeSut(url);

		await sut.auth(mockAuthenticationParams());
		expect(httpPostClientSpy.url).toBe(url);
	});

	it('should call HttpPostClient with the correct body', async () => {
		const { sut, httpPostClientSpy } = makeSut();

		const params = mockAuthenticationParams();
		await sut.auth(params);

		expect(httpPostClientSpy.body).toEqual(params);
	});

	it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.unauthorized,
		};

		const promise = sut.auth(mockAuthenticationParams());
		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});

	it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError,
		};

		const promise = sut.auth(mockAuthenticationParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});
});
