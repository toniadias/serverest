import {
  criarUsuario,
  criarUsuarioDuplicado,
} from '../services/usuarioService';
import { gerarUsuario } from '../support/factories/usuarioFactory';

describe('Cadastro Usuario API', () => {
  it('Deve permitir cadastrar usuario novo sem ser administrador', () => {
    const usuario = gerarUsuario();
    criarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body._id).to.be.a('string');
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      cy.log(`Mensagem: ${response}`);
      cy.log(`Usuário cadastrado: ${usuario.email}`);
      cy.log(`Senha do usuário: ${usuario.password}`);
    });
  });

  it('Não deve permitir cadastrar usuario com email já existente', () => {
    const usuario = gerarUsuario();

    criarUsuario(usuario).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(`Email cadastrado: ${usuario.email}`);
    });

    criarUsuarioDuplicado(usuario).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.eq('Este email já está sendo usado');
    });
  });
});
