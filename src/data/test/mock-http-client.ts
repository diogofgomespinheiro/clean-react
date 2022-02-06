import { HttpPostClient, HttpPostParams } from '@/data/protocols/http';

export class HttpPostClientSpy implements HttpPostClient {
	public url?: string;

	async post({ url }: HttpPostParams): Promise<void> {
		this.url = url;
	}
}
