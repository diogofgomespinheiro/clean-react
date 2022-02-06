import faker from '@faker-js/faker';

import { AuthenticationParams } from '@/domain/usecases';

export const mockAuthenticationParams = (): AuthenticationParams => ({
	email: faker.internet.email(),
	password: faker.internet.password(),
});
