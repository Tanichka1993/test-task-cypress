/// <reference types="cypress" />
import {LoginPage} from '../page-objects/login-page';
import {env} from '../config.json';

describe('login user', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
        loginPage.navigate(env.urls.login);
    });

    it('should login the app with valid credentials', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.fillPassword(env.user.password);
        loginPage.submit();
        cy.location('pathname', { timeout: 10000 }).should('eq', '/'); // todo: set the right location
        cy.title().should('eq', 'Home');
    });

    it('should navigate to the next field after pressing tab', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.usernameElement.tab()
        loginPage.passwordElement.should('have.focus')
    });

    it('should login the app with valid credentials and after pressing enter', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.fillPassword(env.user.password);
        loginPage.passwordElement.focus().type('{enter}');

        cy.location('pathname', { timeout: 10000 }).should('eq', '/'); // todo: set the right location
        cy.title().should('eq', 'Home');
    });


    it('should show error invalid username', () => {
        loginPage.fillUsername(env.invalid_user.username);
        loginPage.fillPassword(env.user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('have.text', 'No account found with that username.');
        loginPage.errorMessageElement.should(
            'have.css',
            'color',
            'rgb(169, 68, 66)'
        );
        loginPage.errorFormElement.should(
            'have.css',
            'border-color',
            'rgb(169, 68, 66)'
        );
    });

    it('should show error invalid password', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.fillPassword(env.invalid_user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('have.text', 'Wrong password');
        loginPage.errorMessageElement.should(
            'have.css',
            'color',
            'rgb(169, 68, 66)'
        );
        loginPage.errorFormElement.should(
            'have.css',
            'border-color',
            'rgb(169, 68, 66)'
        );
    });

    it('should show error email is required field', () => {
        loginPage.fillPassword(env.user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('have.text', "Please enter username.");
        loginPage.errorMessageElement.should(
            'have.css',
            'color',
            'rgb(169, 68, 66)'
        );
        loginPage.errorFormElement.should(
            'have.css',
            'border-color',
            'rgb(169, 68, 66)'
        );
    });

    it('should show error password is required field', () => {
        loginPage.fillUsername(env.user.username);
        loginPage.submit();

        loginPage.errorMessageElement.should('have.text', "Please enter your password.");
        loginPage.errorMessageElement.should(
            'have.css',
            'color',
            'rgb(169, 68, 66)'
        );
        loginPage.errorFormElement.should(
            'have.css',
            'border-color',
            'rgb(169, 68, 66)'
        );
    });

    it('should show error email field is too long', () => {
        loginPage.fillUsername('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,.');
        loginPage.fillPassword(env.user.password);
        loginPage.submit();

        loginPage.errorMessageElement.should('have.text', "Maximum length of username field is 255 symbols ");
        loginPage.errorMessageElement.should(
            'have.css',
            'color',
            'rgb(169, 68, 66)'
        );
        loginPage.errorFormElement.should(
            'have.css',
            'border-color',
            'rgb(169, 68, 66)'
        );
    });
});
