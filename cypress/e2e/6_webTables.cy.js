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

    it.skip('Check finding and editing a record',()=>{
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
            cy.get('#firstName').clear().type('Harvey');
            cy.get('#lastName').clear().type('Specter');
            cy.get('#submit').click();

            //from the cypress testing perspective, we're still in the same row element.
            //Now assertion;

            cy.wrap(row).find('.rt-td').eq(0).should('contain','Harvey');
            cy.wrap(row).find('.rt-td').eq(1).should('contain','Specter');



        })
    })

    it('Check finding and deleting a record',()=>{
        cy.get('.rt-tbody')
        .contains('.rt-tr-group','Alden')
        .then((row)=>{
            // click for Delete button for Alden. When we delete 'Alden' the row will be deleted
           cy.wrap(row).find('[title="Delete"]').click();
           //We deleted 'Alden'. It'll not be available after this then block.
        })
        //Assert that table does not have 'Alden' record
        // First way;
        cy.get('.rt-tbody').should('not.contain','Alden');

        // Second way; to use search box and 3 ways to assert...
        cy.get('#searchBox').type('Alden');
        cy.get('#basic-addon2').click();
        cy.get('.rt-noData').should('have.text', 'No rows found');
        cy.get('.rt-noData').should('contain', 'No rows found');
        cy.get('.rt-noData').should('be.visible');
    })
    })


