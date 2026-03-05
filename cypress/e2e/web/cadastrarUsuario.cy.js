import { gerarUsuario } from '../../support/factories/usuarioFactory.js';

describe('Cadastro Usuario', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Deve permitir cadastro de novo usuário sem ser administrador - login', () => {
    const usuario = gerarUsuario();
    cy.get('[data-testid="cadastrar"]').click();

    cy.url().should('include', '/cadastrarusuarios');
    cy.contains('.font-robot', 'Cadastro').should('be.visible');

    cy.get('[data-testid="nome"]').type(usuario.nome);
    cy.get('[data-testid="email"]').type(usuario.email);
    cy.get('[data-testid="password"]').type(usuario.password);
    cy.get('[data-testid="checkbox"]').should('not.be.checked');
    cy.get('[data-testid="cadastrar"]').click();

    cy.get('.alert-link').should('have.text', 'Cadastro realizado com sucesso');
  });
});
