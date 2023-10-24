/// <reference types="cypress" />

describe('Cypress File Upload Tests', () => {
  beforeEach(() => {
    /**
     * Step 1. In order to upload files in Cypress, we need to add a plugin.
     * Do do that, we run the following command in terminal.
     * npm install -dev cypress-file-upload
     * AND;
     * Step 2. We need to import necessary command to our project
     * in our support folder we have commands.js file:
     * This file is a good place to put our utility methods (functions).
     *
     * We add  the following command;
     * import 'cypress-file-upload';
     *
     * Step 3. The file you want to upload should be in fixture folder.
     *
     */

    cy.clearCookies();
    cy.visit('/upload');
  });

  it('Check upload action', () => {
    // locator for "choose file" button
    cy.get('input#file-upload').attachFile('feel-that-thats-friday-friday.mp4');

    // Then we click upload button
    cy.get('#file-submit').click();

    // Assert that path message is displayed.
    cy.get('#uploaded-files').then(() => {
      cy.contains('feel-that-thats-friday-friday.mp4').should('be.visible');
    });
  });
});
