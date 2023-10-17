class Auth{

// difference between java classes; the name can be different from file name.
// we can put more than one class under 1 file, non of them has the priority over the others.

login(username,password){ // creating a function to login

    cy.get('[name="username"]').type(username);
    cy.get('[type="password"]').type(password);
    cy.get('#wooden_spoon').click();

}


logout(){

   // cy.get('[class="button secondary radius"]').click() ==>

   cy.contains('logout').should('be.visible').click();

}

}

const auth=new Auth();  //Object of the Auth class we created above

module.exports={
        auth
};




/** 
class Locators{ // another class in the same file



}
*/