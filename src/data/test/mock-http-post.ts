import faker from 'faker';
import { HttpPostParams } from '@data/protocols';

export const mockPostRequestParams = (): HttpPostParams<
  Record<string, unknown>
> => ({
  url: faker.internet.url(),
  body: {
    key1: faker.random.word(),
    key2: faker.random.alphaNumeric()
  }
});
