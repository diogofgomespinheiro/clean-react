import axios from 'axios';

import { HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols';

export class AxiosHttpClient
  implements HttpPostClient<Record<string, unknown>, Record<string, unknown>>
{
  async post(
    params: HttpPostParams<Record<string, unknown>>
  ): Promise<HttpResponse<Record<string, unknown>>> {
    const { url, body } = params;
    const httpResponse = await axios.post(url, body);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  }
}
