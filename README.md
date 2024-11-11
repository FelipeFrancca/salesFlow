# salesFlow
Sistema desenvolvido para armazenar o fluxo de vendas da empresa e gerenciar os requisitos para completar a venda.

## Readme ainda em desenvolvimento

## Primeiros passos para rodar aplicação localmente:

### Configure o .env do salesflowapi com os seguintes dados:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD="sua senha aqui"
DB_DATABASE=salesflow
PORT=4000
NODE_ENV=development

### Iniciar aplicação:
Start back api: npm run start:dev
Start front: npm run start:dev

### Em src/app.module.ts:
synchronize: true, // Cria as tabelas automaticamente, desativar em produção caso necessário.
