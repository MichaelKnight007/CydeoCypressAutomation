/// <reference types="cypress" />

describe('Cypress Webtables Tests',{baseUrl:"https://demoqa.com"},()=>{

    /**
     * If you need to navigate to a URL other than baseURL, we can define it in describe or it block.
     * If we define it in describe block, it is valid for all the it() functions in that describe block.
     * If we define baseURL in it() block, it's valid inside that it() block.
     */

    beforeEach(()=>{

        cy.clearCookies();
        cy.visit('/webtables');
    })

    it('Finding and editing a record',()=>{
        /**
         * Locate table body, then navigate through this table to find "Alben",
         * then change it with another person.
         * 1. Get me Table body.
         * 2. Get me the row that contains Alben
         * 3. Store it into a JQuery element
         */
        

        cy.get('.rt-tbody') // Step 1
        .contains('.rt-tr-group', 'Alden') // Step 2. Get me  An approach, going from parent to child.
        .then((row)=>{
            // click for edit button for Alden.
            cy.wrap(row).find('[title="Edit"]').click();
            //Fill in the firstName and lastName boxes with new data.
            cy.get('#firsgit tName').clear().type('Harvey');
            cy.get('#lastName').clear().type('Specter');
            cy.get('#submit').click();

            //from the cypress testing perspective, we're still in the same row element.
            //Now assertion;

            cy.wrap(row).find('.rt-td').eq(0).should('contain','Harvey');
            cy.wrap(row).find('.rt-td').eq(1).should('contain','Specter');



        })
    })



})