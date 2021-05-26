import { HttpPostParams } from '@data/protocols';
import axios from 'axios';

export class AxiosHttpClient {
  async post(params: HttpPostParams<Record<string, unknown>>): Promise<void> {
    const { url } = params;
    await axios(url);
  }
}
