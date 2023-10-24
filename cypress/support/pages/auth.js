class Auth {
  // difference between java classes; the name can be different from file name.
  // we can put more than one class under 1 file, non of them has the priority over the others.

  login(username, password) {
    // creating a function to login

    cy.get('[name="username"]').type(username);
    cy.get('[name="password"]').type(password);
    cy.get('#wooden_spoon').click();
  }

  logout() {
    // cy.get('[class="button secondary radius"]').click() ==>

    cy.contains('logout').should('be.visible').click();
  }
}

class Locators {
  // We can create another class here, how do we use findBy annotation in Cypress

  /**
   * 1. We define locators like a function.
   * 2. We create functions of locators.
   * 3. Create an object of class out of class body.
   * 4. Put that object in "module.exports"
   */

  get userName() {
    // Here userName is the webElement variable name

    return cy.get('[name="username"]', { timeout: 10000 }); // Normally we add a timeout of 3000 ms in cypress.config.js. This time is now a default value for every webElement. But we assume that these webElements need more time than the default value. So, we can define a special timeout for them. It's like implicitly wait, it will continue to run if it locates the webElement, else, it'll wait until 10000 ms depletes.
  }

  get password() {
    // Here password is the webElement variable name
    return cy.get('[type="password"]', { timeout: 10000 });
  }

  get submitButton() {
    return cy.get('#wooden_spoon', { timeout: 10000 });
  }
}

const auth = new Auth(); // Object of the Auth class we created above
const locators = new Locators(); // We created an object of Locators class.

module.exports = {
  auth, // Don't forget to put auth object in export after creating it
  locators, // Don't forget to put locators object in export after creating it
};
