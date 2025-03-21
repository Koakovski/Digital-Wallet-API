# Digital Wallet API

## Descrição

A **Digital Wallet API** é uma solução para gerenciamento de saldo e transferências financeiras entre usuários. Todos os usuários possuem permissão para enviar e receber dinheiro de qualquer outro, garantindo um sistema flexível e seguro para transações financeiras.

## Funcionalidades

- Cadastro de usuários
- Autenticação de usuários
- Envio e recebimento de dinheiro entre usuários
- Validação de saldo antes da transferência
- Transações passíveis de reversão em caso de inconsistência ou solicitação do usuário

## Requisitos

- O usuário deve estar cadastrado para realizar transferências.
- O saldo do usuário deve ser suficiente para efetuar uma transação.
- A transferência deve ser executada dentro de uma transação segura e reversível.

## Melhorias

- [ ] **Adicionar mais testes unitários**
- [ ] **Adicionar testes de integração**
- [ ] **Simular ambiente no Docker**

## Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/digital-wallet-api.git
cd digital-wallet-api
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Subir o banco de dados com Docker

```bash
docker-compose up -d
```

### 4. Aplicar as migrações

```bash
npm run migrate:apply

```

### 5. Rodar a API em modo de desenvolvimento

```bash
npm run dev
```

A API estará disponível em http://localhost:3000.

### Testando a API

- Certifique-se de ter seguido os passos de instalação corretamente.
- Acesse a documentação da API em http://localhost:3000/api.
