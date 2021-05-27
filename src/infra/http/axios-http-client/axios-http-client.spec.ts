import axios from 'axios';

import { mockPostRequestParams } from '@data/test';
import { mockAxios } from '@infra/test';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();

  return {
    sut,
    mockedAxios
  };
};

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockPostRequestParams();
    const { sut, mockedAxios } = makeSut();

    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });

  it('should return the correct statusCode and body', async () => {
    const { sut, mockedAxios } = makeSut();

    const httpResponse = await sut.post(mockPostRequestParams());
    const axiosResponse = await mockedAxios.post.mock.results[0].value;

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    });
  });
});
