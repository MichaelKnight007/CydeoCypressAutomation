// 1. First way, importing from different folder..

import { auth } from '../../support/pages/auth';
/**     here, in js ".." means go to parent
        Here, first we go out of login.js file to pomTest, then to e2e folder. 
        And then we say go to support, then pages,and then auth.
        We imported auth object that we created in auth.js file.
*/

import { navigateTo } from '../../support/pages/navigation';
/**
 * When we write import and then 'na' between {},
 * it'll write the navigationTo object and the rest of the code itself.
 * We imported navigationTo object that we created in navigation.js file.
 *  */

// 2. Second way, Creating an object of source file of locators, here it's auth.js.
const LoginLocators = require('../../support/pages/auth'); // This way reaches all objects of auth file.

describe('Auth: login useer with different ways', () => {
  // navigation to the test page

  beforeEach('Navigate to login page', () => {
    cy.clearAllCookies();
    navigateTo.loginPage(); // This function comes from POM.
  });

  // 1st approach: USING POM FUNCTION. This approach is preferred much. In this approach, we create functions (utility methods) in other files and call the locators using those functions.

  it.skip('Happy path scenario using POM FUNCTION', () => {
    // auth.login('hard coded variables') ==> not a good way.

    // Better way, use fixture file to put data. First call fixture folder,
    // then enter "6_usersForTable" file, then create an object named user inside then(),
    //
    cy.fixture('6_usersForTable').then((user) => {
      auth.login(user.user2.username, user.user2.password);

      // first "user" is the object name we created in then(),
      // after that we call user3.username from 6_usersForTable
      // file and assign it to user, and the same for password.
    });

    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  // 2nd approach: USING LOCATORS OBJECT WE CREATED IN AUTH.JS FILE. In this approach, we call lacotors from another class using an object of locators.

  it.skip('Happy path scenario using POM LOCATORS', () => {
    cy.fixture('6_usersForTable').then((user) => {
      /**  I need to call custom locators object that we created in auth.js file. To do that we can create an object of auth file at class level. So that I can reach whatever auth.js file has through this object.
       * const LoginLocators= require('../../support/pages/auth');
       *
       * */

      LoginLocators.locators.userName.type(user.user2.username); // We reach out to the  get userName() function we created in auth.js through locators object we created in auth.js. Then type the username by getting it from 6_usersForTable.json in fixtures folder.
      LoginLocators.locators.password.type(user.user2.password);
      LoginLocators.locators.submitButton.click();
    });

    // let's call our custom command to verify the text
    cy.textExists('You logged into a secure area!');
    auth.logout();
  });

  it('Check invalid user credentials', () => {
    auth.login('invalidusername', 'invalşdpassword'); // We call the ready custom method and pass our parameters (invalid credentials). Beauty of re-usability.

    // Then verify the error message.
    cy.textExists('Your username is invalid!');
  });
});
