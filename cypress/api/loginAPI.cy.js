import { gerarUsuario } from '../support/factories/usuarioFactory';
import { criarUsuario } from '../services/usuarioService';
import { realizarLogin } from '../services/loginService';

describe('Login API', () => {
  let usuario;

  before(() => {
    usuario = gerarUsuario();
    criarUsuario(usuario);
  });

  it('Deve realizar login com sucesso e retornar token', () => {
    const usuarioLogin = {
      email: usuario.email,
      password: usuario.password,
    };

    realizarLogin(usuarioLogin).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('authorization');
      expect(response.body.authorization).to.be.a('string');
      expect(response.body.message).to.eq('Login realizado com sucesso');
    });
  });
});
