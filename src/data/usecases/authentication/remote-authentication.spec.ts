import { HttpPostClientSpy } from '@/data/test';

import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
	it('should call HttpPostClient with the correct URL', async () => {
		const url = 'any_url';
		const httpPostClientSpy = new HttpPostClientSpy();
		const sut = new RemoteAuthentication(url, httpPostClientSpy);

		await sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
