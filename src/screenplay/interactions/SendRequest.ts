import { Actor } from '../actors/Actor';
import { CallAnAPI } from '../abilities/CallAnAPI';
import { APIResponse } from '@playwright/test';

/**
 * Interaction: SendRequest
 * Send an HTTP request to an API endpoint
 */
export class SendRequest {
  private constructor(
    private method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    private endpoint: string,
    private data?: any,
    private headers?: Record<string, string>
  ) {}

  static get(endpoint: string): SendRequest {
    return new SendRequest('GET', endpoint);
  }

  static post(endpoint: string): { with: (data: any) => SendRequest } {
    return {
      with: (data: any) => new SendRequest('POST', endpoint, data),
    };
  }

  static put(endpoint: string): { with: (data: any) => SendRequest } {
    return {
      with: (data: any) => new SendRequest('PUT', endpoint, data),
    };
  }

  static delete(endpoint: string): SendRequest {
    return new SendRequest('DELETE', endpoint);
  }

  withHeaders(headers: Record<string, string>): SendRequest {
    this.headers = headers;
    return this;
  }

  async performAs(actor: Actor): Promise<APIResponse> {
    const callAnAPI = actor.getAbility<CallAnAPI>(CallAnAPI);
    const apiContext = callAnAPI.getContext();
    const defaultHeaders = callAnAPI.getHeaders();
    const headers = { ...defaultHeaders, ...this.headers };

    let response: APIResponse;

    switch (this.method) {
      case 'GET':
        response = await apiContext.get(this.endpoint, { headers });
        break;
      case 'POST':
        response = await apiContext.post(this.endpoint, {
          data: this.data,
          headers,
        });
        break;
      case 'PUT':
        response = await apiContext.put(this.endpoint, {
          data: this.data,
          headers,
        });
        break;
      case 'DELETE':
        response = await apiContext.delete(this.endpoint, { headers });
        break;
      case 'PATCH':
        response = await apiContext.patch(this.endpoint, {
          data: this.data,
          headers,
        });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${this.method}`);
    }

    return response;
  }
}
