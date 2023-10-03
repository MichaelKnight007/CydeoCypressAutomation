/// <reference types="cypress" />

describe('Find or Get elements by using different locators', () => {

    beforeEach(() => {

        cy.clearCookies();
        cy.visit('/login');
    })

    it('Check different locator strategies', () => {

        // Locator Strategies

        // 1_ By using CSS locator, cypress needs additional extention to use Xpath

        cy.get("input[name='username']").type("CydeoStudent");
        /**  every statement creates an object to be interacted, and next command makes operation on the object
         * that has been created at the previous statement.
         */


        // 2_ By attribute and value
        cy.get("[type='text']").clear(); // We are clearing whatever we have typed in username field locating
        // it again using attribute and value.


        // 3_ How to locate multiple elements using tag name
        //We have 2 elements having input as a tag name. to handle it, we can use each function. 
        // It has 3 parameters, item, index, and the list. We can change the names in function.
        /** 
        cy.get("input").each((item,index,list1), ()=>{

            // Assert the length of the list is 2.
            expect(list1).to.have.length(2);
            expect(item).to.have.attr("type");

        })

        
*/

        // 4. By attribute name
        cy.get('[type]');

        // 5. By className ==> We can overcome space problem that we have in Selenium. 
           /**We use "." instead of space. And we get only the value of className attribute,
           and we start with ".".
           */
        cy.get('.btn.btn-primary');

        // 6. By id ==> We start with #.
        cy.get('#wooden_spoon');

        // 7. By Text ==> There is no xpath in cypress, but we can use text to locate with a different approach.
        cy.get('button').should('contain','Login').click();
         /**
          * There may be more than one tag name button. We say it should have the text "Login". So we use 
          * text of it to locate.
          */
    })

    it.only('Check finding elements by travelling through DOM_Document Object Model',()=>{
        // Travel to find the login button ==> Locate username field, go to parent form, then find Login button.
        cy.get('input[name="username"]').parents('form').find('button').should('contain','Login').click();
    })

})