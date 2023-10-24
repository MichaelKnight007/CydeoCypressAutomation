// export directly; second way...

export class NavigateTo {
  loginPage() {
    cy.visit(Cypress.env('login')); // We're calling login env from cypress.config.jg file
    // Cypress.env takes the parameter of defined in the paranthesis
  }
}

export const navigateTo = new NavigateTo();
