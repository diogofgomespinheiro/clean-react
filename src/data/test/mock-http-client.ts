import { HttpPostClient, HttpPostParams } from '@/data/protocols/http';

export class HttpPostClientSpy implements HttpPostClient {
	public url?: string;

	public body?: Record<string, unknown>;

	async post({ url, body }: HttpPostParams): Promise<void> {
		this.url = url;
		this.body = body;
	}
}
