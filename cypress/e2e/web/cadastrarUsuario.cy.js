import { gerarUsuario } from '../../support/factories/usuarioFactory.js';

describe('Cadastro Usuario', () => {
  before(() => {
    cy.fixture('login').then((usuario) => {
      cy.visit('/login');
      cy.get('[data-testid="email"]').type(usuario.email);
      cy.get('[data-testid="senha"]').type(usuario.senha);

      cy.get('[data-testid="entrar"]').click();

      cy.url().should('include', '/admin/home');
      cy.contains('h1', 'Bem Vindo').should('be.visible');
    });
  });

  it('Deve permitir cadastro de novo usuário sem ser administrador', () => {
    const usuario = gerarUsuario();

    cy.get('[data-testid="cadastrarUsuarios"]').click();

    cy.url().should('include', '/admin/cadastrarusuarios');
    cy.contains('h1', 'Cadastro de usuários').should('be.visible');

    cy.get('[data-testid="nome"]').type(usuario.nome);
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="password"]').type(usuario.senha);
    cy.get('[data-testid="checkbox"]').should('not.be.checked');
    cy.get('[data-testid="cadastrarUsuario"]').click();

    cy.url().should('include', '/admin/listarusuarios');
    cy.contains('h1', 'Lista dos usuários').should('be.visible');
  });
});
