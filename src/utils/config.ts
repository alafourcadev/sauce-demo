import dotenv from 'dotenv';

dotenv.config();

export const config = {
  sauceDemo: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    users: {
      standard: {
        username: process.env.SAUCE_USERNAME || 'standard_user',
        password: process.env.SAUCE_PASSWORD || 'secret_sauce',
      },
      locked: {
        username: process.env.SAUCE_USERNAME_LOCKED || 'locked_out_user',
        password: process.env.SAUCE_PASSWORD || 'secret_sauce',
      },
      problem: {
        username: process.env.SAUCE_USERNAME_PROBLEM || 'problem_user',
        password: process.env.SAUCE_PASSWORD || 'secret_sauce',
      },
    },
  },
  api: {
    baseUrl: process.env.API_BASE_URL || 'https://dummyjson.com',
    users: [
      {
        username: process.env.API_USER1_USERNAME || 'emilys',
        password: process.env.API_USER1_PASSWORD || 'emilyspass',
      },
      {
        username: process.env.API_USER2_USERNAME || 'michaelw',
        password: process.env.API_USER2_PASSWORD || 'michaelwpass',
      },
      {
        username: process.env.API_USER3_USERNAME || 'sophiab',
        password: process.env.API_USER3_PASSWORD || 'sophiabpass',
      },
    ],
  },
  test: {
    headless: process.env.HEADLESS === 'true',
    timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  },
};
