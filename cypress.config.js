// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
const { defineConfig } = require('cypress');
require("dotenv").config(); // << penting agar .env dibaca

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    env: {
      USERNAME: 'admin',
      PASSWORD: 'password123'
      // USERNAME: process.env.USERNAME,
      // PASSWORD: process.env.PASSWORD
      // USERNAME: Cypress.env('USERNAME'),
      // PASSWORD: Cypress.env('PASSWORD')
    }
    // supportFile: 'cypress/support/e2e.js'
  }
});

