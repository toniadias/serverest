class LoginPage {
  acessarLogin() {
    cy.visit('/login');
  }

  preencherFormulario(email, senha) {
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type(senha);
  }

  submeterFormulario() {
    cy.get('[data-testid="entrar"]').click();
  }

  validarLoginSucesso() {
    cy.url({ timeout: 10000 }).should('include', '/admin/home');
    cy.contains('h1', 'Bem Vindo').should('be.visible');
  }

  validarLoginFalha() {
    cy.get('.alert span')
      .last()
      .should('have.text', 'Email e/ou senha inválidos');
  }

  submeterCadastro() {
    cy.get('[data-testid="cadastrar"]').click();
  }
}

export default new LoginPage();
