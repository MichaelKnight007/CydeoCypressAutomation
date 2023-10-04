/// <reference types="cypress" />

describe('My Second Test', () => {

    beforeEach(() => {

        cy.clearCookies();
        cy.visit('/multiple_buttons');

    })

    it('Check different button actions', () => {
        // Select a button with text
        cy.contains('Button 2').should('be.visible').click();
        cy.contains('Clicked on button two!').should('be.visible');

        // Find the element withh class attribute, create a list, click the third element
        // When we use then() method, all the buttons are taken into a JQuery List.
        // We use "wrap" method to transfer the list of JQuery to a List of Cypress.
        cy.get('.btn.btn-primary').then(($buttons) => {
            cy.wrap($buttons).eq(2).click();// eq(2) means get index 2, element 3.

            // Assertion...
            cy.contains('Clicked on button three!').should('be.visible');
            // We have to be in the same get block.

        })


    })




})