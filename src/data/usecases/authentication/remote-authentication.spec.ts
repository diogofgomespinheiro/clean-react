import { HttpPostClient } from '@data/protocols/http/http-post-client';
import RemoteAuthentication from '@data/usecases/authentication/remote-authentication';

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', () => {
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;

      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }

    const url = 'any_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
