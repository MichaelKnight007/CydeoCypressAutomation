const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://practice.cydeo.com',
   // video:false,
    retries:1,
    env: {
        login:'/login',
        apiUrl:"https://demoqa.com", // We can add some more elements of different test cases in environment for avoiding hard coding.
        apiBooks:"/BookStore/v1/Books/"
    },
    defaultCommandTimeout:3000,
    viewportHeight: 800,
    viewportWidth: 1200,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
