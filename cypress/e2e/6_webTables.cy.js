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

    it('Check finding and editing a record',()=>{
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

    it('Search for different age groups',()=>{ // JAva approach; create an array, and check all the values
        // in a loop.

        //Define age group
        const ageGroups=[29,39,45,77];

        //perform same test scenario for every element; In Selenium, it's Data Driven Testing
        // We wrap the array elements inside a Cypress object. Get every element one by one using each method,
        // and create a function. 
        cy.wrap(ageGroups).each((age)=>{
            // 1.step clear search box and type age ==> this age is variable we created in function;
            cy.get('#searchBox').clear().type(age);
            //verify if that age exists and find the number of records.// metadata approach

            if(age===77){

                //NEGATIVE SCENARIO
                cy.get('.rt-tbody').find('.rt-tr-group').first().should('not.contain',age);
                cy.get('rt-noData').should('contain','No rows found').should('be.visible');
            }else{

                //POSITIVE SCENARIO
            cy.get('.rt-tbody').find('.rt-tr-group').first().should('contain',age);
            cy.get('rt-tbody').contains('.rt-tr-group',age).should('have.length',1);
            }

        })



    })

    it('Check adding a new record_ Bad practice',()=>{
        // Click on ADD button
        cy.get('#addNewRecordButton').click();

        //Fill the form
        cy.get('#firstName').type('Harvey');
        cy.get('#lastName').type('Specter');
        cy.get('userEmail').type('specter@example.com');
        cy.get('age').type('40');
        cy.get('salary').type('70000');
        cy.get('department').type('legal');
        cy.get('#submit').click();

        // Assert; new record is added
        cy.get('rt-tbody')
        .contains('rt-tr-group','Harvey')
        .then((rowElement)=>{
            cy.wrap(rowElement).find('rt-td').eq(0).should('contain','Harvey');
            cy.wrap(rowElement).find('rt-td').eq(1).should('contain','Specter');
            cy.wrap(rowElement).find('rt-td').eq(2).should('contain','specter@example.com');
            cy.wrap(rowElement).find('rt-td').eq(3).should('contain','40');
            cy.wrap(rowElement).find('rt-td').eq(4).should('contain','70000');
            cy.wrap(rowElement).find('rt-td').eq(5).should('contain','legal');
            


        })








    })


    it('Check adding a new record_ Better practice',()=>{
        // Click add button
        cy.get('#addNewRecordButton').click();
        
        // Get the data from fixture folder;
        cy.fixture('6_usersForTable').then((user)=>{
            const columnNames=Object.keys(user.user1)
            /**
             * Goes to fixture folder, finds usersForTable class, and get the object keys of user1,
             * then stores into columnNames Array
             */

            const userData=Object.values(user.user1);

            cy.wrap(columnNames).each((columnName, index)=>{

                console.log(columnName);
                console.log(userData[index]);

                cy.get(`#${columnName}`).type(`${userData[index]}`);
                

            });
            cy.get('#submit').click();

            // Assert; New record is added
            cy.get('.rt-tbody')
            .contains('.rt-tr-group', userData[0])
            .then((row)=>{
                cy.wrap(userData).each((value, index)=>{
                    cy.wrap(row).find('.rt-td').eq(index).should('contain',value)

                })

                
                
            })
        })
    })
})


