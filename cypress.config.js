const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://practice.cydeo.com',
   // video:false,
    retries:2,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
