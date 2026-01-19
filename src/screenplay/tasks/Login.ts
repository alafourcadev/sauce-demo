import { Actor } from '../actors/Actor';
import { Navigate } from '../interactions/Navigate';
import { Fill } from '../interactions/Fill';
import { Click } from '../interactions/Click';
import { LoginPage } from '../../pages/LoginPage';

/**
 * Task: Login
 * Perform login on SauceDemo
 */
export class Login {
  private constructor(
    private username: string,
    private password: string
  ) {}

  static as(username: string, password: string): Login {
    return new Login(username, password);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Navigate.to(LoginPage.URL),
      Fill.field(LoginPage.SELECTORS.usernameInput).with(this.username),
      Fill.field(LoginPage.SELECTORS.passwordInput).with(this.password),
      Click.on(LoginPage.SELECTORS.loginButton)
    );
  }
}
