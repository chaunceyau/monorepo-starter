import { getGreeting } from '../support/app.po';

describe('next-starter', () => {
  // beforeEach(() => cy.visit('/'));

  it('should allow me to login', () => {
    cy.visit('/auth/signin');
    cy.get('#email').type('demo@gmail.com');
    cy.get('#password').type('pass');
    cy.get('#submit-login').click();
  });
});
