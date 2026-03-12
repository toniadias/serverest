import LoginPage from '../pages/LoginPage';
import { gerarUsuario } from '../support/factories/usuarioFactory';

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
    LoginPage.acessarLogin();
    LoginPage.preencherFormulario(usuario.email, usuario.password);
    LoginPage.submeterFormulario();
    LoginPage.validarLoginSucesso();
  });

  it('Login com dados inválidos deve exibir mensagem de erro', () => {
    LoginPage.acessarLogin();
    LoginPage.preencherFormulario(
      usuarioInvalido.emailInvalido,
      usuarioInvalido.senhaInvalida,
    );
    LoginPage.submeterFormulario();
    LoginPage.validarLoginFalha();
  });
});
