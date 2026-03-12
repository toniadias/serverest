const apiUrl = Cypress.env('apiUrl');

export function criarUsuario(usuario) {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/usuarios`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: usuario,
  });
}

export function criarUsuarioDuplicado(usuario) {
  return cy.request({
    method: 'POST',
    url: `${apiUrl}/usuarios`,
    headers: {
      'Content-Type': 'application/json',
    },
    body: usuario,
    failOnStatusCode: false,
  });
}
