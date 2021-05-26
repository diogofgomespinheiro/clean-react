import axios from 'axios';
import faker from 'faker';

import { HttpPostParams } from '@data/protocols';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => new AxiosHttpClient();

const mockPostRequestParams = (): HttpPostParams<Record<string, unknown>> => ({
  url: faker.internet.url(),
  body: {
    key1: faker.random.word(),
    key2: faker.random.alphaNumeric()
  }
});

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockPostRequestParams();
    const sut = makeSut();

    sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
});
