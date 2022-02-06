import faker from '@faker-js/faker';

import { mockAuthenticationParams } from '@/domain/test';
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
});
