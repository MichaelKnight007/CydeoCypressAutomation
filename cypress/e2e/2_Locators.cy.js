/// <reference types="cypress" />

describe('Find or Get elements by using different locators', () => {

    beforeEach(() => {

        cy.clearCookies();
        cy.visit('/login');
    })

    it('Check different locator strategies', () => {

        // Locator Strategies

        // 1_ By using CSS locator, cypress needs additional dependency to use Xpath

        cy.get("input[name='username']").type('CydeoStudent');
        /**  every statement creates an object to be interacted, and next command makes operation on the object
         * that has been created at the previous statement.
         */ 


        // 2_ By attribute and value
        cy.get("[type='text']").clear(); // We are clearing whatever we have typed in username field locating
        // it again using attribute and value.



    })


})