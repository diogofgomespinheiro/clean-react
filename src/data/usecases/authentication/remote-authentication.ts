import { AuthenticationParams } from '@/domain/usecases';
import { BadRequestError, InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { HttpPostClient, HttpStatusCode } from '@/data/protocols';

export class RemoteAuthentication {
	constructor(private readonly url: string, private readonly httpPostClient: HttpPostClient) {}

	async auth(params: AuthenticationParams): Promise<void> {
		const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });

		switch (httpResponse.statusCode) {
			case HttpStatusCode.ok:
				return;
			case HttpStatusCode.badRequest:
				throw new BadRequestError();
			case HttpStatusCode.unauthorized:
				throw new InvalidCredentialsError();
			default:
				throw new UnexpectedError();
		}
	}
}
