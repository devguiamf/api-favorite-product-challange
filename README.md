# Labs Challenge 🏪

## Descrição 📖
Este projeto foi desenv olvido utilizando NestJS e MongoDB, seguindo a arquitetura hexagonal, conceitos de arquitetura limpa e Domain-Driven Design (DDD). Não foi incluido suites de teste.

## Requisitos 📋
- Node.js
- npm
- Instância MongoDB (URL)
- Docker (para execução com Docker)

## Instalação e execução do projeto 🚀

### Método Manual
1. Clone o repositório:
    ```bash
    git clone api-favorite-product-challenge
    cd api-favorite-product-challenge
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o arquivo `.env` com as variáveis `JWT_SECRET`, `JWT_EXPIRES_IN` e `MONGO_URI` conforme o `.env.example`. A variável `MONGO_URI` deve conter a URL da sua instância MongoDB.

4. Execute a aplicação em modo de desenvolvimento:
    ```bash
    npm run start:dev
    ```

### Com Docker
1. Clone o repositório:
    ```bash
    git clone api-favorite-product-challenge
    cd api-favorite-product-challenge
    ```
2. Configure o arquivo `.env` com as variáveis `JWT_SECRET`, `JWT_EXPIRES_IN` e `MONGO_URI` conforme o `.env.example`. A variável `MONGO_URI` deve conter a URL da sua instância MongoDB.

3. Execute a aplicação com Docker:
    ```bash
    docker-compose up
    ```

### Possiveis melhorias 🔧
Ideias de melhoria para o projeto que não foram aplicados:
- Adicionar fastify;
- Clusterizar a aplicação;
- Adicionar cache em pontos especificos que o mongodb era acessado;
- implementar suite completa de testes