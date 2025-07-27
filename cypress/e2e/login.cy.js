describe('Login and Notes CRUD', () => {
  const email = 'testuser@example.com';
  const password = 'Test1234';

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Logs in with valid credentials', () => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('My Notes');
  });

  it('Creates a new note', () => {
    cy.get('input[placeholder="Title"]').type('Test Note');
    cy.get('textarea[placeholder="Content"]').type('This is a test note.');
    cy.get('button').contains('Add Note').click();

    cy.contains('Test Note');
    cy.contains('This is a test note.');
  });

  it('Edits an existing note', () => {
    cy.contains('Edit').click();
    cy.get('input[placeholder="Title"]').clear().type('Updated Note');
    cy.get('textarea[placeholder="Content"]').clear().type('Updated content');
    cy.get('button').contains('Update Note').click();

    cy.contains('Updated Note');
    cy.contains('Updated content');
  });

  it('Deletes the note', () => {
    cy.contains('Delete').click();
    cy.contains('Updated Note').should('not.exist');
  });

  it('Logs out', () => {
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/');
  });

  it('Fails login with invalid password', () => {
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type('WrongPass123');
    cy.get('button[type="submit"]').click();

    cy.contains('Login failed').should('exist');
  });
});
