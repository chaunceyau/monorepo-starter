import {routes} from '@monorepo-starter/utils';

describe('next-starter', () => {
  // beforeEach(() => cy.visit('/'));

  it('should allow me to login with email/password', () => {
    cy.visit(routes.client.login);
    cy.get('#btn-use-email-pw').click();

    cy.get('#email').type('demo@gmail.com');
    cy.get('#password').type('pass');
    cy.get('#submit-login').click();

    cy.get('#authenticated-app');
  });
  
  it('should display avatar dropdown on click', () => {
    cy.visit(routes.client.login);
    cy.get('#btn-use-email-pw').click();

    cy.get('#email').type('demo@gmail.com');
    cy.get('#password').type('pass');
    cy.get('#submit-login').click();

    cy.get('#avatar-dropdown').click();

    cy.get('#avatar-dropdown-items');
  });
});
