const { gerarUsuario } = require('../../support/factories/usuarioFactory');

describe('Login', () => {
  let usuario;
  let usuarioInvalido;
  const apiUrl = Cypress.env('apiUrl');

  before(() => {
    cy.fixture('login').then((data) => {
      usuarioInvalido = data;
    });

    usuario = gerarUsuario();

    cy.request('POST', `${apiUrl}/usuarios`, usuario).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(`Usuário cadastrado: ${usuario.email}`);
      cy.log(`Senha do usuário: ${usuario.password}`);
    });
  });

  it('Login com dados válidos deve permitir acesso ao sistema', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="senha"]').type(usuario.password);
    cy.get('[data-testid="entrar"]').click();
    cy.url({ timeout: 10000 }).should('include', '/admin/home');
    cy.contains('h1', 'Bem Vindo').should('be.visible');
  });

  it('Login com dados inválidos deve exibir mensagem de erro', () => {
    cy.visit('/login');
    cy.get('[data-testid="email"]').type(usuarioInvalido.emailInvalido);
    cy.get('[data-testid="senha"]').type(usuarioInvalido.senhaInvalida);
    cy.get('[data-testid="entrar"]').click();
    cy.get('.alert span')
      .last()
      .should('have.text', 'Email e/ou senha inválidos');
  });
});
