export class LoginPage {
    get usernameElement() {
        return cy.get(':nth-child(1) > .form-control');
    }

    get passwordElement() {
        return cy.get(':nth-child(2) > .form-control');
    }

    get errorMessageElement() {
        return cy.get('.has-error > .help-block');
    }

    get errorFormElement() {
        return cy.get('.has-error > .form-control');
    }

    get submitButtonElement() {
        return cy.get('.btn')
    }

    navigate() {
        cy.visit('https://www.pecodesoftware.com/qa-portal/greet.php');
    }

    fillUsername(username) {
        this.usernameElement.type(username);
    }

    fillPassword(password) {
        this.passwordElement.type(password);
    }

    submit() {
        this.submitButtonElement.click();
    }
}