/**
 * Page Object: LoginPage
 * Locators and selectors for the SauceDemo login page
 */
export class LoginPage {
  static readonly URL = 'https://www.saucedemo.com';

  static readonly SELECTORS = {
    usernameInput: '[data-test="username"]',
    passwordInput: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    errorMessage: '[data-test="error"]',
    errorButton: '.error-button',
  };
}
