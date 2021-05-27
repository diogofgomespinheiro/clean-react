import axios from 'axios';
import faker from 'faker';

export const mockHttpResponse = (): Record<string, unknown> => ({
  data: faker.random.objectElement(),
  status: faker.datatype.number()
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};
