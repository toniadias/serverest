# Testes Automatizados com Cypress -- Serverest

## Objetivo do Projeto

Este projeto contém uma suíte de **testes automatizados desenvolvida com
Cypress e JavaScript** para validar funcionalidades da aplicação
**Serverest**.

Os testes cobrem:

- **Testes de API (Backend)**
- **Testes End-to-End (Frontend Web)**

O objetivo é garantir **qualidade, confiabilidade e validação dos fluxos
principais do sistema**, como cadastro e autenticação de usuários.

Também demonstra boas práticas de automação:

- Page Object Pattern
- Factory Pattern
- Uso de Fixtures
- Separação entre testes Web e API
- Variáveis de ambiente com dotenv

---

# Estrutura do Projeto

    serverest/
    ├── cypress/
    │
    │   ├── api/                       # Testes de API
    │   │   ├── cadastrarUsuarioAPI.cy.js
    │   │   └── loginAPI.cy.js
    │
    │   ├── e2e/                       # Testes web (E2E)
    │   │   ├── cadastrarUsuarioWeb.cy.js
    │   │   └── loginWeb.cy.js
    │
    │   ├── fixtures/                  # Dados de teste
    │   │   └── login.json
    │
    │   ├── pages/                     # Page Objects
    │   │   ├── CadastroUsuarioPage.js
    │   │   └── LoginPage.js
    │
    │   ├── services/                  # Serviços de API
    │   │   ├── loginService.js
    │   │   └── usuarioService.js
    │
    │   └── support/
    │       ├── commands.js
    │       ├── e2e.js
    │       └── factories/
    │           └── usuarioFactory.js
    │
    ├── cypress.config.js
    ├── package.json
    └── README.md

---

# Dependências

Pacote Descrição

---

Cypress Framework de automação de testes
@faker-js/faker Geração de dados aleatórios
dotenv Variáveis de ambiente

---

# Instalação

## Pré‑requisitos

- Node.js 14+
- npm ou yarn

## Clonar o projeto

```bash
git clone <url-do-repositorio>
cd serverest
```

## Instalar dependências

```bash
npm install
```

---

# Configuração

Crie um arquivo `.env` na raiz do projeto:

    BASE_URL=https://front.serverest.dev/
    BASE_API=https://serverest.dev/

---

# Execução dos Testes

## Abrir Cypress (modo interativo)

```bash
npm run cy:open
```

Permite executar testes individualmente e debugar cenários.

## Executar testes (modo headless)

```bash
npm run cy:run
```

Ideal para execução automática ou pipelines CI/CD.

---

# Testes de API

Aplicação testada:

https://serverest.dev/

### Cadastro de Usuário

Endpoint:

    POST /usuarios

Cenários:

- Cadastro de usuário com sucesso (status 201)
- Validação de email duplicado (status 400)

### Login

Endpoint:

    POST /login

Cenário:

- Login com credenciais válidas retornando token de autenticação.

Fluxo:

1.  Criar usuário via API
2.  Realizar login
3.  Validar retorno do token

---

# Testes Web (E2E)

Aplicação testada:

https://front.serverest.dev

## Login

Cenários:

- Login com dados válidos
- Login com dados inválidos

Elementos utilizados:

- `[data-testid="email"]`
- `[data-testid="senha"]`
- `[data-testid="entrar"]`

## Cadastro de Usuário

Fluxo validado:

1.  Acessar página de cadastro
2.  Preencher formulário
3.  Submeter cadastro
4.  Validar mensagem de sucesso

---

# Helpers

## Factory

Arquivo:

    usuarioFactory.js

Responsável por gerar dados de usuário aleatórios para os testes.

Benefícios:

- evita duplicação de dados
- aumenta confiabilidade dos testes

## Fixtures

Arquivo:

    login.json

Usado para armazenar dados estáticos utilizados em cenários negativos.

---

# Configuração do Cypress

Arquivo:

    cypress.config.js

```javascript
const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      apiUrl: process.env.BASE_API,
    },
  },
});
```

---

# Autor

**Tonia Dias**\
QA Engineer -- Automação de Testes

Projeto criado para prática de automação e demonstração de habilidades
técnicas.

LinkedIn: https://www.linkedin.com/in/toniadias

---

Última atualização: Março 2026
