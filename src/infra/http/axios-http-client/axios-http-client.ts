/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

import { HttpPostClient, HttpPostParams, HttpResponse } from '@data/protocols';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<any>> {
    const { url, body } = params;
    const httpResponse = await axios.post(url, body);

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    };
  }
}
