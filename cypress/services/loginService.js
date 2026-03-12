export function realizarLogin(usuario) {
  const apiUrl = Cypress.env('apiUrl');
  return cy.request('POST', `${apiUrl}/login`, {
    email: usuario.email,
    password: usuario.password,
  });
}
