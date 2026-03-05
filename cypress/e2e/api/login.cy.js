const { gerarUsuario } = require('../../support/factories/usuarioFactory');

describe('Login API', () => {
  let usuario;
  const apiUrl = Cypress.env('apiUrl');

  before(() => {
    usuario = gerarUsuario();

    cy.request('POST', `${apiUrl}/usuarios`, usuario).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(`Usuário cadastrado: ${usuario.email}`);
      cy.log(`Senha do usuário: ${usuario.password}`);
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
});
