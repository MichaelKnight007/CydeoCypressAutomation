// export directly; second way... 

export class NavigateTo{


    LoginPage(){
cy.visit(Cypress.env('login')); // We're calling login env from cypress.config.jg file

    }

}

export const navigateTo=new navigateTo();