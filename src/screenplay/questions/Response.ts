import { APIResponse } from '@playwright/test';

/**
 * Question: Response
 * Extract information from an API response
 */
export class Response {
  private constructor(private response: APIResponse) {}

  static from(response: APIResponse): Response {
    return new Response(response);
  }

  async status(): Promise<number> {
    return this.response.status();
  }

  async body(): Promise<any> {
    return await this.response.json();
  }

  async text(): Promise<string> {
    return await this.response.text();
  }

  async headers(): Promise<{ [key: string]: string }> {
    return this.response.headers();
  }

  async isOk(): Promise<boolean> {
    return this.response.ok();
  }
}
