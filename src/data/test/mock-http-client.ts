import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols';

export class HttpPostClientSpy implements HttpPostClient {
	public url?: string;

	public body?: Record<string, unknown>;

	public response: HttpResponse = {
		statusCode: HttpStatusCode.noContent,
	};

	async post({ url, body }: HttpPostParams): Promise<HttpResponse> {
		this.url = url;
		this.body = body;

		return this.response;
	}
}
