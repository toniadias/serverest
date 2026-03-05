# Testes Automatizados com Cypress

## Objetivo do Projeto

Este projeto é uma suíte de testes automatizados desenvolvida com **Cypress** e **JavaScript** para validar a funcionalidade de um sistema de e-commerce chamado **Serverest**. Os testes cobrem tanto a camada de **Frontend (Web)** quanto a camada de **API (Backend)**, garantindo a qualidade e confiabilidade do sistema em diferentes níveis de teste.

---

## Estrutura do Projeto

### Componentes Principais

```
serverest/
├── cypress/
│   ├── e2e/                          # Testes end-to-end
│   │   ├── api/                      # Testes da API
│   │   │   ├── cadastrarUsuario.cy.js
│   │   │   └── login.cy.js
│   │   └── web/                      # Testes do Frontend
│   │       ├── cadastrarUsuario.cy.js
│   │       └── login.cy.js
│   ├── fixtures/                     # Dados de teste (fixtures)
│   │   └── login.json
│   └── support/                      # Utilitários e configurações
│       ├── commands.js               # Comandos customizados do Cypress
│       ├── e2e.js                    # Configuração global dos testes E2E
│       └── factories/
│           └── usuarioFactory.js     # Factory para geração de dados de teste
├── cypress.config.js                 # Configuração do Cypress
├── package.json                      # Dependências do projeto
└── README.md                          # Este arquivo
```

### Descrição dos Arquivos e Pastas

| Componente                      | Descrição                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------- |
| **cypress/e2e/api/**            | Contém os testes de API que validam os endpoints do backend do Serverest      |
| **cypress/e2e/web/**            | Contém os testes de UI que validam a interface web do sistema                 |
| **cypress/fixtures/**           | Armazena dados estáticos reutilizáveis em testes (ex: credenciais inválidas)  |
| **cypress/support/factories/**  | Factory pattern para geração dinâmica de dados de teste (usuários aleatórios) |
| **cypress/support/commands.js** | Define comandos customizados reutilizáveis nos testes                         |
| **cypress/support/e2e.js**      | Configurações globais aplicadas a todos os testes                             |
| **cypress.config.js**           | Arquivo de configuração principal do Cypress                                  |

---

## Dependências do Projeto

O projeto utiliza as seguintes dependências:

| Pacote              | Versão   | Descrição                                                          |
| ------------------- | -------- | ------------------------------------------------------------------ |
| **cypress**         | ^15.11.0 | Framework de automação de testes                                   |
| **@faker-js/faker** | ^9.9.0   | Biblioteca para geração de dados fictícios (nomes, emails, senhas) |
| **dotenv**          | ^17.3.1  | Gerenciamento de variáveis de ambiente                             |

---

## Instalação

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

### Passos para Instalação

1. **Clone o repositório** (se aplicável):

   ```bash
   git clone <url-do-repositorio>
   cd serverest
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   BASE_URL=https://front.serverest.dev/
   BASE_API=https://serverest.dev/
   ```

---

## Execução dos Testes

### Scripts Disponíveis

Os scripts estão definidos no `package.json`:

| Script               | Comando           | Descrição                                                  |
| -------------------- | ----------------- | ---------------------------------------------------------- |
| **Cypress GUI**      | `npm run cy:open` | Abre o Cypress no modo interativo (GUI)                    |
| **Cypress Headless** | `npm run cy:run`  | Executa os testes em modo headless (sem interface gráfica) |

### Modo GUI (Modo Interativo)

Ideal para desenvolvimento e debug:

```bash
npm run cy:open
```

Este comando:

- Abre a interface do Cypress
- Permite visualizar os testes em tempo real
- Facilita o debug com ferramentas de inspeção
- Permite executar testes individuais

### Modo Headless

Ideal para CI/CD e execução em pipelines:

```bash
npm run cy:run
```

Este comando:

- Executa todos os testes automaticamente
- Não exibe interface gráfica
- Mais rápido e eficiente
- Gera relatórios de execução

### Executando Testes Específicos

#### Executar apenas testes da API:

```bash
npm run cy:run -- --spec cypress/e2e/api/**
```

#### Executar apenas testes da Web:

```bash
npm run cy:run -- --spec cypress/e2e/web/**
```

#### Executar um arquivo de teste específico:

```bash
npm run cy:run -- --spec cypress/e2e/api/login.cy.js
```

#### Executar testes de um navegador específico:

```bash
npm run cy:run -- --browser chrome
# ou
npm run cy:run -- --browser firefox
```

---

## Documentação dos Testes Automatizados

### Testes de API

#### Arquivo: `cadastrarUsuario.cy.js`

**Objetivo**: Validar o fluxo de cadastro de usuários via API

| Cenário                    | Validação                               | Resultado Esperado                                     |
| -------------------------- | --------------------------------------- | ------------------------------------------------------ |
| **Cadastrar usuário novo** | POST `/usuarios` com dados válidos      | Status 201, retorno do `_id` e mensagem de sucesso     |
| **Email duplicado**        | Tentar cadastrar com email já existente | Status 400 e mensagem "Este email já está sendo usado" |

**Funcionalidades Testadas**:

- ✅ Criação de novos usuários
- ✅ Geração automática de dados aleatórios via Factory
- ✅ Validação de resposta HTTP
- ✅ Detecção de erros de duplicação

**Dados de Teste**:
Os dados são gerados dinamicamente pela Factory `usuarioFactory.js` com:

- Nome aleatório
- Email aleatório
- Senha aleatória
- Administrador: true

---

#### Arquivo: `login.cy.js`

**Objetivo**: Validar o fluxo de autenticação via API

| Cenário               | Pré-requisito              | Validação                                                |
| --------------------- | -------------------------- | -------------------------------------------------------- |
| **Login com sucesso** | Usuário criado previamente | POST `/login` retorna token de autenticação (status 200) |

**Funcionalidades Testadas**:

- ✅ Autenticação de usuários
- ✅ Geração de tokens JWT
- ✅ Validação de credenciais
- ✅ Hooks `before()` para setup de dados

**Fluxo**:

1. Cria um usuário via API
2. Realiza login com as credenciais do usuário criado
3. Valida se o token foi retornado corretamente

---

### Testes de Frontend (Web)

#### Arquivo: `login.cy.js`

**Objetivo**: Validar o fluxo de login na interface web

| Cenário                       | Dados Utilizados       | Validações                                                   |
| ----------------------------- | ---------------------- | ------------------------------------------------------------ |
| **Login com dados válidos**   | Usuário criado via API | Redirecionamento para `/admin/home`, exibição de "Bem Vindo" |
| **Login com dados inválidos** | Fixture (login.json)   | Exibição de mensagem "Email e/ou senha inválidos"            |

**Funcionalidades Testadas**:

- ✅ Preenchimento de formulário de login
- ✅ Navegação entre páginas
- ✅ Exibição de mensagens de erro
- ✅ Validação de estado da página (URL)
- ✅ Uso de fixtures para dados de teste

**Elementos Interagidos** (via data-testid):

- `[data-testid="email"]` - Campo de email
- `[data-testid="senha"]` - Campo de senha
- `[data-testid="entrar"]` - Botão de login
- `.alert span` - Mensagem de erro

---

#### Arquivo: `cadastrarUsuario.cy.js`

**Objetivo**: Validar o fluxo de cadastro de usuários na interface web

| Cenário                             | Dados Utilizados            | Validações                                                     |
| ----------------------------------- | --------------------------- | -------------------------------------------------------------- |
| **Cadastro sem permissão de admin** | Usuário gerado pela Factory | Redirecionamento para `/cadastrarusuarios`, sucesso na criação |

**Funcionalidades Testadas**:

- ✅ Navegação para página de cadastro
- ✅ Preenchimento de formulário completo
- ✅ Validação de checkbox de administrador
- ✅ Confirmação de cadastro bem-sucedido
- ✅ Exibição de mensagem de sucesso

**Elementos Interagidos** (via data-testid):

- `[data-testid="cadastrar"]` - Link/botão para cadastro
- `[data-testid="nome"]` - Campo de nome
- `[data-testid="email"]` - Campo de email
- `[data-testid="password"]` - Campo de senha
- `[data-testid="checkbox"]` - Checkbox de administrador
- `.alert-link` - Mensagem de sucesso

---

## Helpers e Utilitários

### Factory Pattern: `usuarioFactory.js`

**Propósito**: Gerar dados de usuário aleatórios para uso nos testes

**Função**: `gerarUsuario()`

```javascript
Retorna um objeto com:
- nome: string (nome completo aleatório)
- email: string (email aleatório)
- password: string (senha aleatória)
- administrador: 'true' (flag de administrador)
```

**Utilização**:

```javascript
const usuario = gerarUsuario();
cy.request('POST', `${apiUrl}/usuarios`, usuario);
```

**Benefício**: Evita duplicação de dados entre execuções de testes

---

### Fixtures: `login.json`

**Propósito**: Armazenar dados estáticos para testes de cenários negativos

**Conteúdo**:

```json
{
  "emailInvalido": "usuario@invalido.com",
  "senhaInvalida": "senha_invalida"
}
```

**Utilização**:

```javascript
cy.fixture('login').then((data) => {
  usuarioInvalido = data;
});
```

---

## Configuração do Projeto

### `cypress.config.js`

```javascript
const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL, // URL base da aplicação web
    env: {
      apiUrl: process.env.BASE_API, // URL base da API
    },
  },
});
```

**Variáveis de Ambiente**:

- `BASE_URL`: URL da aplicação web (https://front.serverest.dev/)
- `BASE_API`: URL da API (https://serverest.dev/)

---

## Resumo dos Testes

### Cobertura de Testes (Exemplo Parcial)

> Nota: Esta cobertura é **exemplo demonstrativo** para fins educacionais e entrevistas. Não representa cobertura completa do sistema.

| Tipo              | Quantidade | Cenários                                   |
| ----------------- | ---------- | ------------------------------------------ |
| **Testes de API** | 3          | Cadastro (2), Login (1)                    |
| **Testes Web**    | 3          | Login (2), Cadastro (1)                    |
| **Total**         | 6          | Autenticação, Cadastro, Validação de Erros |

### Funcionalidades Cobertas

✅ **Cadastro de Usuários** (API e Web)  
✅ **Autenticação e Login** (API e Web)  
✅ **Validação de Erros** (Email duplicado, credenciais inválidas)  
✅ **Geração de Dados Aleatórios** (Factory Pattern)  
✅ **Navegação entre Páginas** (Web)  
✅ **Chamadas HTTP** (API)

---

## Dicas para Debug e Troubleshooting

### Problema: Testes falhando por timeout

**Solução**: Aumente o tempo de espera:

```javascript
cy.url({ timeout: 10000 }).should('include', '/admin/home');
```

### Problema: Elementos não encontrados

**Solução**: Verifique se os `data-testid` estão corretos e use o debugger:

```bash
npm run cy:open
```

### Problema: Erros de variáveis de ambiente

**Solução**: Certifique-se de que o arquivo `.env` está na raiz do projeto com as variáveis:

```env
BASE_URL=https://front.serverest.dev/
BASE_API=https://serverest.dev/
```

---

## Recursos Adicionais

- [Documentação Oficial do Cypress](https://docs.cypress.io/)
- [Faker.js Documentation](https://fakerjs.dev/)
- [Serverest API Documentation](https://serverest.dev/)
- [Front Serverest](https://front.serverest.dev/)

---

## Autor

**Tonia Dias** – Sênior QA Engineer - Automação de Testes  
Projeto desenvolvido para fins educacionais, prática de automação de testes e demonstração de habilidades em entrevistas.

- [LinkedIn](https://www.linkedin.com/in/toniadias)

---

**Última atualização**: Março de 2026  
**Status**: ✅ Pronto para uso
