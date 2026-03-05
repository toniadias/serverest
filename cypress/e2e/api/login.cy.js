const { gerarUsuario } = require('../../support/factories/usuarioFactory');

describe('Login API', () => {
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
      cy.log(usuario.email);
      cy.log(usuario.password);
    });
  });

  it('Deve realizar login com sucesso e retornar token', () => {
    const usuarioLogin = {
      email: usuario.email,
      password: usuario.password,
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: usuarioLogin,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.be.a('string');
      expect(response.body.message).to.eq('Login realizado com sucesso');
    });
  });

  it('Deve falhar ao realizar login com credenciais inválidas', () => {
    const usuarioLoginInvalido = {
      email: usuarioInvalido.emailInvalido,
      password: usuarioInvalido.senhaInvalida,
    };

    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: usuarioLoginInvalido,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.eq('Email e/ou senha inválidos');
    });
  });
});
