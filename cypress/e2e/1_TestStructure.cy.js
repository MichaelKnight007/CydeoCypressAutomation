/// <reference types="cypress" />

describe('Context: My First Tests', () => {
  before(() => {
    // runs once before all test cases in that describe block, like BeforeClass() in TestNG.
  });

  beforeEach(() => {
    // runs before each test case in the block, similar to beforeMethod() in TestNG
    cy.clearCookies();
  });

  after(() => {
    // runs once after all test cases finis in that describe block, like AfterClass() in TestNG.
  });

  afterEach(() => {
    // runs after each test case in the block, similar to afterMethod() in TestNG
  });

  /** 
it('Opening a web application', ()=>{

    cy.visit('https://practice.cydeo.com/');
    cy.get(':nth-child(9) > a').click();
    cy.get('.nav-link').click();
   // cy.get(':nth-child(9) > table').click(); // ==> Creating error.

})


*/
  it.skip('Opening a web application', () => {
    cy.visit('/registration_form');
  });

  it('Test 2', () => {
    expect(false).to.equal(false);
  });

  it('Test 3', () => {
    expect(false).not.to.equal(true);
  });

  it('Test 4', () => {
    expect(5).to.equal(5);
  });

  it('Test 5', () => {
    expect(true).to.equal('5' == 5);
  });
});
