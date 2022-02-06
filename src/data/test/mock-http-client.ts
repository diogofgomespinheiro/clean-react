import { HttpPostClient } from '@/data/protocols/http';

export class HttpPostClientSpy implements HttpPostClient {
	public url?: string;

	async post(url: string): Promise<void> {
		this.url = url;
	}
}
