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

        // get all buttons using button tag name, each method is creating a loop.
        cy.get('button').each((item, index, list) => {
            // assert the length of the list, verfy the number of buttons
            expect(list).to.have.length(6);
            expect(item).to.have.attr('onclick');
        })

        /** We'll get all the buttons like previous approach, get only the item then check of 
         * text of each item, if it eaquals to button 4, then click on it.
        */

        cy.get('button').each((item)=>{

            if (item.text()=='Button 4'){
                cy.log(item.text()); // This command writes the text of button 4 to the test console
                
                //item.click() will work, but this method is depricated, because item is JQuerry now.
                // We need to wrap() it, so convert it to cypress.
                cy.wrap(item).click();
            cy.contains('Clicked on button four!').should('be.visible');
            }
            



        })

    })
})