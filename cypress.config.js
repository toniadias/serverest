const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.BASE_URL,
    env: {
      apiUrl: process.env.BASE_API,
    },
    specPattern: ['cypress/e2e/**/*.cy.js', 'cypress/api/**/*.cy.js'],
  },
});
