/// <reference types="cypress" />

describe('Alerts in Cypress Test Environment',{baseUrl:'https://demoqa.com'},()=>{

    beforeEach(()=>{

        cy.clearCookies();
        cy.visit('/alerts');

    })

    it('Check alert confirmation',()=>{ 
        /**  Click the third "Click me" button which is for confirmation
        **** cy.get('#confirmButton').click();***
        * cy will handle the pop up alert messages itself, so we don't see any pop up messages,
        * it finishes the test using browser commands like;
        * window: alert, window:confirm, window:on, etc.
        */

        // 1. Create a stub() function
        const stub=cy.stub(); // We use stub() function to stop cypress before it handles pop up alerts...

        //2. // When this confirmation initiated, 
        //store and give the command to stub() function.
        cy.on('window:confirm',stub);  

        //3. Check the alert message.
        cy.get('#confirmButton').click().then(()=>{

            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
            // With this command chain, we are checking the pop up message of alert using stub().
        });


        // 4. Connfirm the message by clicking OK button or not confirm by clicking cancel button
        cy.on('window:confirm', ()=> true); //confirms the alert

        // 5. Assert you selection
        cy.contains('You selected Ok').should('be.visible');

    })


    it('Check alert cancelation',()=>{

        const stub=cy.stub();
        cy.on('window:confirm', stub)
        cy.get('#confirmButton').click().then(()=>{

            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?');
        });

        cy.on('window:confirm', ()=> false); //Selecting Cancel
        cy.contains('You selected Cancel').should('be.visible');


    })

})