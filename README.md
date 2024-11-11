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
<p>Start back api: npm run start:dev</p>
<p>Start front: npm run start:dev</p>

### Caso tenha o interesse de colocar o projeto no online:
Em /salesflowapi/src/app.module.ts: O comando "synchronize: true" cria as tabelas automaticamente, desativar em produção caso necessário.
