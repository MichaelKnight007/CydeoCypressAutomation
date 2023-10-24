describe('How to do API tests with Cypress', () => {
  it('Simple GET Request and check status headers and body', () => {
    cy.request({
      // For API testing, the request function uses parameter in json object, and we define core parts of HTTP request inside this object.

      method: 'GET',

      // Hardcoded url: https://demoqa.com/BookStore/v1/Books/
      url: `${Cypress.env('apiUrl')}${Cypress.env('apiBooks')}`, // We use $ and {} to call a variable. We call apiUrl and apiBooks from cypress.config file using env function.

      // We can define other elements of the object based on our test case.
      failOnStatusCode: false, // There is only 2** and 3** status codes in Cypress, it'll not check others. To check other status codes, we use this method.

      /**
       * Since Cypress is JS based, we need to deserialize the response. In Selenium, we need to do it, convert that response object to Java type to analyze. But, we dont need it in Cypress
       */
    }).then((response) => {
      expect(response.status).to.equal(200);
      cy.log(response);
      cy.log(response.body.books[0].isbn);
      cy.log(response.body.books[1].title);

      // verify second book has title: Learning JavaScript Design Patterns
      expect(response.body.books[1].title).equal('Learning JavaScript Design Patterns');

      // Verify the header Connection is "keep-alive"
      expect(response.headers.connection).to.equal('keep-alive');

      // Create an object of response, then print all the titles of the elements on console and all the elements.

      const { books } = response.body;

      books.forEach((element) => {
        console.log(element.title);
        console.log(element);

        // A loop for verification title

        /**  let index=0;
            
                cy.fixture('bookTitles').then((expectedBookTitle)=>{

                    expect(response.body.books[index].title).to.equal(expectedBookTitle[index]);
                    console.log(expectedBookTitle);
                    index++;
                    /**
                     * 1. We created a varible named index.
                     * 2. we called the data from bookTitles file in fixture folder and created an array named expectedBookTitle.
                     * 3. we started to assert, first we get all the elements of response  using index number, then we get the elements of expectedBookTitle array, and compared them using to.equal method.
                     * Then we increased index number one for the next loop.
                     * This was wrong, we did not create a loop for all the titles, it did the assertion of the first title for 8 times.
                     * })
                     */

        cy.fixture('bookTitles').then((expectedBookTitle) => {
          for (let i = 0; i < 8; i++) {
            expect(response.body.books[i].title).to.equal(expectedBookTitle[i]);
            console.log(expectedBookTitle[i]);
          }
        });
      });
    });
    // We can run api tests in cypress.cli like a UI Test. So we can combine api test with UI.
  });
});
