/// <reference types="cypress" />

describe('Input Forms Tests', () => {
  beforeEach('Navigate to registration page', () => {
    cy.clearCookies();
    cy.visit('/registration_form');
  });

  it('Check different input box fields and verify', () => {
    // fill the form for username and other info
    cy.get('input[name="firstname"]').type('Michael');
    cy.get('input[name="lastname"]').type('Knight');
    cy.get('input[name="username"]').type('Michael');

    // creating a dynamic fake email.
    /**
     * there will be some fix parts, like; "formTest12345@cydeo.com".
     * Numbers will be randomized. To do so, we use backtics to be able to put some external dat.
     *
     * Math.random() creates a number between 0 and 1, ie 0.006754
     * Then we multiply it with 900000 adn add 100000.
     * Math.floor() makes it a whole number.
     * We assign the number to a variable, then use it in our code in type().
     */

    const email = `formtest${Math.floor(100000 + Math.random() * 900000)}@cydeo.com`;
    cy.get('input[name="email"]').type(email);

    const password = `test${Math.floor(100000 + Math.random() * 900000)}`;
    cy.get('input[name="password"]').type(password);

    const phoneNumber = `555-000-${Math.floor(1000 + Math.random() * 9000)}`;
    cy.get('input[name="phone"]').type(phoneNumber);
    cy.get('input[name="birthday"]').type('01/07/1999');
  });

  it('Check radio button actions', () => {
    // cy.get('.radio') ==> this is an object that collects all radio buttons, we have 3 elements
    // in this object.
    cy.get('.radio')
      .find('[type=radio]') // Nıw we trvel through DOM elements in this object.
      .then((radio) => {
        // We create a function for all of them. The object is JQuery object, so we use wrap().
        // get all the radio buttons, select first of them, then verify it's checked.

        cy.wrap(radio).first().check().should('be.checked'); // Cypress works in a chainable functions structure.
        /**
         * radio: is Jquery object, cy.wrap() tuns into Cypress object, so that we can use Cypress ready functions
         * first(): selects first element.
         * check(): checks it out
         * should(): verifies whatever we provide as a parameter ('be.checked').
         */

        // Get all the radio buttons, select the second one,
        // then verify it's checked and confirmation label is visible.

        cy.wrap(radio).eq(1).check().should('be.checked');
        cy.get('[data-bv-icon-for="gender"]').should('be.visible');
        // verify that third one is not checked

        cy.wrap(radio).last().should('not.be.checked');
      });
  });

  it('Check Different Checkbox Actions', () => {
    // get all the checkboxes and select JAVA and verify

    cy.get('[type="checkbox"]').then((checkbox) => {
      cy.wrap(checkbox).eq(1).check().should('be.checked');

      // Uncheck Java
      cy.wrap(checkbox).eq(1).uncheck().should('not.be.checked');

      // Check third one has a value JavaScript and the check and verify

      cy.wrap(checkbox).eq(2).should('have.value', 'javascript').check().should('be.checked');
    });
  });

  it('Check selection of a single choice from a select dropdown', () => {
    // select one element
    cy.get('[name="job_title"]').select('SDET');

    // assert that dropdown has correct text after selecting
    cy.get('[name="job_title"]').contains('SDET');
  });

  it('Check selection of all select dropdown options', () => {
    // We'll provide data through fixtures folder as JSON object, than use that data to verfy select values
    cy.fixture('departments').then((departments) => {
      // Get all options in the menu, iterate through these options one by one

      cy.get('select[name="department"]>option').each((eachOption, index) => {
        // get eachOption's text
        const optionText = eachOption.text();
        cy.log(optionText);
        cy.log(index);
        cy.log(departments[index]);
        // Selecting and asserting one by one
        cy.get('select[name="department"]')
          .select(optionText)
          .should('have.value', eachOption.val())
          .contains(departments[index]);
        /**
         * We get all the elements and select frist one. That option should have eachOption.val().
         * Then we call the data from departments file in fixtures folder.
         */
      });
    });
  });
});
