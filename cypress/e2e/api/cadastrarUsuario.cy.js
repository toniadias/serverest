const { gerarUsuario } = require('../../support/factories/usuarioFactory');

describe('Cadastro Usuario API', () => {
  it('Deve permitir cadastrar usuario novo sem ser administrador', () => {
    const usuario = gerarUsuario();
    const apiUrl = Cypress.env('apiUrl');

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: usuario,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body._id).to.be.a('string');
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      cy.log(`Usuário cadastrado: ${usuario.email}`);
      cy.log(`Senha do usuário: ${usuario.password}`);
    });
  });

  it('Não deve permitir cadastrar usuario com email já existente', () => {
    const usuario = gerarUsuario();
    const apiUrl = Cypress.env('apiUrl');

    cy.request('POST', `${apiUrl}/usuarios`, usuario).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(`Email cadastrado: ${usuario.email}`);
    });

    cy.request({
      method: 'POST',
      url: `${apiUrl}/usuarios`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: usuario,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });
});
