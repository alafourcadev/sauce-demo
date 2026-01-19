import { Actor } from '../actors/Actor';
import { SendRequest } from '../interactions/SendRequest';
import { CallAnAPI } from '../abilities/CallAnAPI';
import { APIResponse } from '@playwright/test';

/**
 * Task: AuthenticateAPI
 * Authenticate a user via API and store the token
 */
export class AuthenticateAPI {
  private response?: APIResponse;

  private constructor(
    private username: string,
    private password: string
  ) {}

  static as(username: string, password: string): AuthenticateAPI {
    return new AuthenticateAPI(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    const loginData = {
      username: this.username,
      password: this.password,
    };

    this.response = await SendRequest.post('/auth/login')
      .with(loginData)
      .performAs(actor);

    // Store the token in the API ability
    if (this.response.ok()) {
      const body = await this.response.json();
      if (body.token || body.accessToken) {
        const token = body.token || body.accessToken;
        const apiAbility = actor.getAbility<CallAnAPI>(CallAnAPI);
        apiAbility.setAuthToken(token);
      }
    }
  }

  getResponse(): APIResponse | undefined {
    return this.response;
  }
}
