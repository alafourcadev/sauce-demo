import { APIRequestContext, request } from '@playwright/test';
import { config } from '../../utils/config';

/**
 * Ability: CallAnAPI
 * Represents the ability of an actor to make API calls
 */
export class CallAnAPI {
  private apiContext: APIRequestContext;
  private authToken?: string;

  private constructor(apiContext: APIRequestContext) {
    this.apiContext = apiContext;
  }

  /**
   * Initialize the API context and return a new CallAnAPI ability
   */
  static async using(baseURL?: string): Promise<CallAnAPI> {
    const apiContext = await request.newContext({
      baseURL: baseURL || config.api.baseUrl,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
    return new CallAnAPI(apiContext);
  }

  /**
   * Get the API context
   */
  getContext(): APIRequestContext {
    return this.apiContext;
  }

  /**
   * Set the authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Get the authentication token
   */
  getAuthToken(): string | undefined {
    return this.authToken;
  }

  /**
   * Get headers with authentication if available
   */
  getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }
    return headers;
  }

  /**
   * Close the API context
   */
  async dispose(): Promise<void> {
    await this.apiContext.dispose();
  }
}
