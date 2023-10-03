/// <reference types="cypress" />

describe('Find or Get elements by using different locators', () => {

    beforeEach(() => {

        cy.clearCookies();
        cy.visit('/login');
    })

    it('Check different locator strategies', () => {

        // Locator Strategies

        // 1_ By using CSS locator, cypress needs additional dependency to use Xpath

        cy.get("input[name='username']").type("CydeoStudent");
        /**  every statement creates an object to be interacted, and next command makes operation on the object
         * that has been created at the previous statement.
         */ 


        // 2_ By attribute and value
        cy.get("[type='text']").clear(); // We are clearing whatever we have typed in username field locating
        // it again using attribute and value.


        // 3_ How to locate multiple elements
        //We have 2 elements having input as a tag name. to handle it, we can use each function. 
        // It has 3 parameters, item, index, and the list. We can change the names in function.
        /** 
        cy.get("input").each((item,index,list1), ()=>{

            // Assert the length of the list is 2.
            expect(list1).to.have.length(2);
            expect(item).to.have.attr("type");

        })
*/
    })

})