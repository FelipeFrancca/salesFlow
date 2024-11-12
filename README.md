# salesFlow

Sistema desenvolvido para armazenar o fluxo de vendas e gerenciar os requisitos para completar a venda, com compras e produtos.

## Índice
- [Visão Geral](#visão-geral)
- [Backend](#Backend)
- [Frontend](#Frontend)
- [Pré-requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
- [Back-end](#back-end)
- [Front-end](#front-end)

## Visão Geral

- **Objetivo**: Projeto desenvolvido para possibilitar a criação de vendas e os requisitos para atender a determinada venda. Os requisitos são supridos com a geração de uma compra, onde deve-se adicionar produtos previamente ao sistema, para leva-los para o carrinho e então gerar uma compra relacionada a determinada venda.
- **Status do Projeto**: Beta.

### Back-end
- Nest.js
- Typescript
- Banco de Dados: PostgreSQL.

### Front-end
- Next.js
- Material UI / Tailwind
- Axios (para requisições HTTP).

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v14+)
- [npm](https://www.npmjs.com/)
- Banco de dados: PostgreSQL.

## Instalação e Configuração
## Back-end

Configure um arquivo .env na pasta da API /cd salesflowapi com os seguintes dados:
- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=postgres
- DB_PASSWORD="sua senha aqui"
- DB_DATABASE=salesflow
- PORT=4000
- NODE_ENV=development

> cd salesflowapi
> npm install
> npm run start:dev

## Fron-tend

> cd ../frontend
> npm install
> npm run dev

### Caso tenha o interesse de colocar o projeto no online:
Em /salesflowapi/src/app.module.ts: O comando "synchronize: true" cria as tabelas automaticamente, desativar em produção caso necessário.
