import { Given, When, Then, Before, After, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { APIResponse } from '@playwright/test';
import { Actor } from '../../src/screenplay/actors/Actor';
import { CallAnAPI } from '../../src/screenplay/abilities/CallAnAPI';
import { SendRequest } from '../../src/screenplay/interactions/SendRequest';
import { config } from '../../src/utils/config';
import { validateLoginResponse } from '../../src/api/schemas/LoginSchema';

let actor: Actor;
let currentResponse: APIResponse;
let authToken: string;
let currentUser: { username: string; password: string };

Before(async function () {
  actor = Actor.named('API Test User');
  const callAnAPI = await CallAnAPI.using(config.api.baseUrl);
  await actor.whoCan(callAnAPI);
});

After(async function () {
  if (actor) {
    await actor.cleanup();
  }
});

// DADO - Given steps
Given('que tengo las credenciales del usuario {string}', function (username: string) {
  const user = config.api.users.find((u) => u.username === username);
  if (!user) {
    throw new Error(`Usuario ${username} no encontrado en la configuración`);
  }
  currentUser = user;
});

// CUANDO - When steps
When('envío una solicitud POST a {string} con las credenciales', async function (endpoint: string) {
  const loginData = {
    username: currentUser.username,
    password: currentUser.password,
  };

  currentResponse = await SendRequest.post(endpoint).with(loginData).performAs(actor);
});

When('guardo el token de acceso', async function () {
  const body = await currentResponse.json();
  authToken = body.token || body.accessToken;

  // Set the token in the API ability
  const apiAbility = actor.getAbility<CallAnAPI>(CallAnAPI);
  apiAbility.setAuthToken(authToken);
});

When('envío una solicitud GET a {string} con el token de autenticación', async function (endpoint: string) {
  currentResponse = await SendRequest.get(endpoint).performAs(actor);
});

// ENTONCES - Then steps
Then('la respuesta debe tener código de estado {int}', async function (expectedStatus: number) {
  const status = currentResponse.status();
  expect(status).toBe(expectedStatus);
});

Then('la respuesta debe contener un token de acceso', async function () {
  const body = await currentResponse.json();
  expect(body.token || body.accessToken).toBeDefined();
  expect(typeof (body.token || body.accessToken)).toBe('string');
  expect((body.token || body.accessToken).length).toBeGreaterThan(0);
});

Then('la respuesta debe cumplir con el esquema de login', async function () {
  const body = await currentResponse.json();
  const validation = validateLoginResponse(body);

  if (!validation.valid) {
    console.error('Errores de validación del esquema:', validation.errors);
  }

  expect(validation.valid).toBe(true);
});

Then('la respuesta debe contener los siguientes campos:', async function (dataTable: DataTable) {
  const body = await currentResponse.json();
  const expectedFields = dataTable.rows().map((row) => row[0]);

  for (const field of expectedFields) {
    expect(body).toHaveProperty(field);
  }
});

Then('la respuesta debe contener una lista de usuarios', async function () {
  const body = await currentResponse.json();
  expect(body.users).toBeDefined();
  expect(Array.isArray(body.users)).toBe(true);
  expect(body.users.length).toBeGreaterThan(0);
});

Then('la respuesta debe contener los datos del usuario autenticado {string}', async function (username: string) {
  const body = await currentResponse.json();
  expect(body.username).toBe(username);
  expect(body.id).toBeDefined();
  expect(body.email).toBeDefined();
});
