import axios from 'axios';
import faker from 'faker';
import { AxiosHttpClient } from './axios-http-client';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => new AxiosHttpClient();

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL and correct method', async () => {
    const url = faker.internet.url();
    const sut = makeSut();

    sut.post({ url });
    expect(mockedAxios.post).toHaveBeenCalledWith(url);
  });
});
