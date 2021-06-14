import {routes} from '@monorepo-starter/utils';

describe('next-starter', () => {
  // beforeEach(() => cy.visit('/'));

  it('should allow me to login', () => {
    cy.visit(routes.client.login);
    cy.get('#email').type('demo@gmail.com');
    cy.get('#password').type('pass');
    cy.get('#submit-login').click();
  });
});
