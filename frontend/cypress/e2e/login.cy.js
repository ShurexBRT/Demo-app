describe('Login and Notes CRUD', () => {
  const email = 'testuser@example.com';
  const password = 'Test1234';

  it('Complete flow: login, create, edit, delete, logout, fail login', () => {
    // LOGIN
    cy.visit('http://localhost:5173/');
    cy.get('input[type="email"]').should('be.visible').type(email);
    cy.get('input[type="password"]').should('be.visible').type(password);
    cy.get('button[type="submit"]').should('be.visible').click();
    cy.url().should('include', '/dashboard');
    cy.contains('My Notes');

    // CREATE
    cy.get('input[placeholder="Title"]').type('Test Note');
    cy.get('textarea[placeholder="Content"]').type('This is a test note.');
    cy.get('button').contains('Add Note').click();
    cy.contains('Test Note');
    cy.contains('This is a test note.');

    // EDIT
    cy.contains('Edit').click();
    cy.get('input[placeholder="Title"]').clear().type('Updated Note');
    cy.get('textarea[placeholder="Content"]').clear().type('Updated content');
    cy.get('button').contains('Update Note').click();
    cy.contains('Updated Note');
    cy.contains('Updated content');

    // DELETE
    cy.contains('Delete').click();
    cy.contains('Updated Note').should('not.exist');

    // LOGOUT
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/');

    // FAIL LOGIN
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type('WrongPass123');
    cy.get('button[type="submit"]').click();
    cy.wait(1000); // Wait for error message to appear
    cy.contains('Invalid email or password').should('exist');
  });
});
