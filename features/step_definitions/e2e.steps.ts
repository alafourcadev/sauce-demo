import { Given, When, Then, Before, After, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Actor } from '../../src/screenplay/actors/Actor';
import { BrowseTheWeb } from '../../src/screenplay/abilities/BrowseTheWeb';
import { Login } from '../../src/screenplay/tasks/Login';
import { AddProductToCart } from '../../src/screenplay/tasks/AddProductToCart';
import { CompleteCheckout } from '../../src/screenplay/tasks/CompleteCheckout';
import { Navigate } from '../../src/screenplay/interactions/Navigate';
import { Fill } from '../../src/screenplay/interactions/Fill';
import { Click } from '../../src/screenplay/interactions/Click';
import { Text, IsVisible } from '../../src/screenplay/questions/Text';
import { LoginPage } from '../../src/pages/LoginPage';
import { CheckoutPage } from '../../src/pages/CheckoutPage';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { config } from '../../src/utils/config';

let actor: Actor;

Before(async function () {
  actor = Actor.named('Test User');
  const browseTheWeb = await BrowseTheWeb.using();
  await actor.whoCan(browseTheWeb);
});

After(async function () {
  if (actor) {
    await actor.cleanup();
  }
  await BrowseTheWeb.closeAll();
});

// DADO - Given steps
Given('que el usuario está en la página de login de SauceDemo', async function () {
  await actor.attemptsTo(Navigate.to(LoginPage.URL));
});

// CUANDO - When steps
When('el usuario inicia sesión con credenciales válidas', async function () {
  await actor.attemptsTo(
    Login.as(
      config.sauceDemo.users.standard.username,
      config.sauceDemo.users.standard.password
    )
  );
});

When(
  'el usuario intenta iniciar sesión con usuario {string} y contraseña {string}',
  async function (username: string, password: string) {
    await actor.attemptsTo(
      Fill.field(LoginPage.SELECTORS.usernameInput).with(username),
      Fill.field(LoginPage.SELECTORS.passwordInput).with(password),
      Click.on(LoginPage.SELECTORS.loginButton)
    );
  }
);

When('el usuario agrega {string} al carrito', async function (productName: string) {
  await actor.attemptsTo(AddProductToCart.named(productName));
  // Small wait to ensure the product is added
  await new Promise((resolve) => setTimeout(resolve, 500));
});

When('el usuario completa el checkout con los datos:', async function (dataTable: DataTable) {
  const data = dataTable.hashes()[0];
  await actor.attemptsTo(
    CompleteCheckout.withInformation(data.firstName, data.lastName, data.postalCode)
  );
});

// ENTONCES - Then steps
Then('el usuario debe ver el mensaje de confirmación {string}', async function (expectedMessage: string) {
  const completeHeader = await actor.asks(Text.of(CheckoutPage.SELECTORS.completeHeader));
  expect(completeHeader).toContain(expectedMessage);
});

Then('el usuario debe ver el mensaje de error {string}', async function (expectedError: string) {
  const errorText = await actor.asks(Text.of(LoginPage.SELECTORS.errorMessage));
  expect(errorText).toContain(expectedError);
});

Then('el contador del carrito debe mostrar {string} productos', async function (expectedCount: string) {
  const cartBadgeText = await actor.asks(Text.of(InventoryPage.SELECTORS.shoppingCartBadge));
  expect(cartBadgeText).toBe(expectedCount);
});
