# Desafios NodeJS

Esta pasta é dedicada à prática dos desafios propostos:

- [Desafio 1](https://github.com/pedroferronato/node-desafios/tree/main/desafio-01) - Projetos e tarefas

## Executando os arquivos
---

Para execução dos arquivos é necessário instalar [Node.js](https://nodejs.org/pt-br/).

Instale as dependência do projeto com o comando:

```bash
npm install
```

Após a instalação, acesse a pasta do arquivo e execute:

```bash
npm start
```

## MySQL - Conexões
---
O arquivo de configuração de conexão ao banco de dados:

- src/config/config.json

É necessário criar estes arquisvos, existindo arquivos exemplo (.env.example e config-examples.json) para nortear o preenchimento dos arquivos em seu ambiente.

## ORM - Migrações
---

Os projetos dependem do processo de migração, para realiza-la execute os seguintes comandos na pasta `src` do projeto:

```bash
npx sequelize-cli db:migrate
```

Em sequência execute o processo de seeding, caso existam arquivos na pasta `seeders`: 

```bash
npx sequelize-cli db:seed:all
```

## Documentação

Cada projeto neste repositório definem sua documentação em arquivo README.md dedicado:

- Desafio 1 ([Documentação](https://github.com/pedroferronato/node-desafios/tree/main/desafio-01/README.md))