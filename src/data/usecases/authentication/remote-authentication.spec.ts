import { HttpPostClientSpy } from '@data/test';
import { RemoteAuthentication } from '@data/usecases/authentication/remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const makeSut = (url = 'any_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return {
    sut,
    httpPostClientSpy
  };
};

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', () => {
    const url = 'any_url';
    const { httpPostClientSpy, sut } = makeSut(url);

    sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
