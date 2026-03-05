describe('Login', () => {
  let usuario;

  before(() => {
    cy.fixture('login').then((data) => {
      usuario = data;
    });
  });

  it('Login com dados válidos deve permitir acesso ao sistema', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type(usuario.senha);
    cy.get('[data-testid="entrar"]').click();
    cy.url().should('include', '/admin/home');
    cy.contains('h1', 'Bem Vindo').should('be.visible');
  });

  it('Login com dados inválidos deve exibir mensagem de erro', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(usuario.emailInvalido);
    cy.get('[data-testid="senha"]').type(usuario.senhaInvalida);
    cy.get('[data-testid="entrar"]').click();
    cy.get('.alert span')
      .last()
      .should('have.text', 'Email e/ou senha inválidos');
  });
});
