class CadastrarUsuarioPage {
  acessarPaginaCadastro() {
    cy.url().should('include', '/cadastrarusuarios');
    cy.contains('Cadastro').should('be.visible');
  }

  preencherFormulario(nome, email, password) {
    cy.get('[data-testid="nome"]').type(nome);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(password);
  }

  validarNaoAdministrador() {
    cy.get('[data-testid="checkbox"]').should('not.be.checked');
  }

  validarAdministrador() {
    cy.get('[data-testid="checkbox"]').should('be.checked');
  }

  submeterFormulario() {
    cy.get('[data-testid="cadastrar"]').click();
  }

  verificarMensagemSucesso() {
    cy.get('.alert-link').should('have.text', 'Cadastro realizado com sucesso');
  }
}

export default new CadastrarUsuarioPage();
