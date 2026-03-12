import CadastrarUsuarioPage from '../pages/CadastroUsuarioPage.js';
import LoginPage from '../pages/LoginPage.js';
import { gerarUsuario } from '../support/factories/usuarioFactory.js';

describe('Cadastro Usuario', () => {
  before(() => {
    LoginPage.acessarLogin();
  });

  it('Deve permitir cadastro de novo usuário sem ser administrador - login', () => {
    const usuario = gerarUsuario();
    LoginPage.submeterCadastro();

    cy.url().should('include', '/cadastrarusuarios');
    cy.contains('.font-robot', 'Cadastro').should('be.visible');

    CadastrarUsuarioPage.preencherFormulario(
      usuario.nome,
      usuario.email,
      usuario.password,
    );
    CadastrarUsuarioPage.validarNaoAdministrador();
    CadastrarUsuarioPage.submeterFormulario();
    CadastrarUsuarioPage.verificarMensagemSucesso();
  });
});
