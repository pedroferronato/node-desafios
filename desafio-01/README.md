# Documentação 

Esta API permite registro de projetos e suas tarefas

## Endpoints 
---

### Registro de projeto

POST `/project`

Permite o envio de um novo projeto, recebendo o registro realizado como resposta à requisição. Todos os campos são obrigatórios.

O corpo da requisição deve ser no formato JSON e incluir os campos:

- `title`
- `description`
- `tasks` - lista de Tasks
  - `title`
  - `taskRelevance`
  - `completed`

Exemplo de envio

```javascript
{
    "title": "string",
    "description": "string",
    "tasks" : [
        {
            "title": "string",
            "taskRelevance": integer,
            "completed": boolean
        }
    ]
}
```

Exemplo de retorno

```javascript
{
    "id": "dd688f0b-a460-46c5-a2bc-ccfbf8f85959",
    "title": "controle de estoque",
    "description": "responsável por acompanhar o fluxo de mercadorias da empresa. Deve documentar e analisar as informações das vendas realizadas",
    "tasks": [
        {
            "id": "a8d01f61-bbac-4e6e-ada2-eefc6698456c",
            "title": "desenvolver endpoint para cadastro de produto",
            "taskRelevance": 10,
            "completed": false,
            "projeto_id": "dd688f0b-a460-46c5-a2bc-ccfbf8f85959",
            "updatedAt": "2022-01-06T12:32:51.557Z",
            "createdAt": "2022-01-06T12:32:51.557Z"
        }
    ],
    "updatedAt": "2022-01-06T12:32:51.333Z",
    "createdAt": "2022-01-06T12:32:51.333Z"
}
```
---
### Buscar todos os projetos

GET /project

Permite a busca de todos os projetos registrados na base de dados. Em caso de nenhum registro ser encontrado retorna-se mensagem de erro e código 404. 

Modelo de resposta

```javascript
[
    {
        "id": UUIDv4,
        "title": "string",
        "description": "string",
        "createdAt": datetime,
        "updatedAt": datetime,
        "tasks": [
            {
                "id": UUIDv4,
                "title": "string",
                "taskRelevance": integer,
                "completed": boolean,
                "createdAt": datetime,
                "updatedAt": datetime
            }
        ]
    }
]
```
---
### Buscar projeto por id

GET /project/`:id`

Permite a busca de um projeto baseado em seu identificador. Em caso de nenhum registro ser encontrado se retorna mensagem de erro e código 404. 

A URL da requisição deve conter o UUIDv4 desejado.

Exemplo de identificador: `dd688f0b-a460-46c5-a2bc-ccfbf8f85959`

Modelo de resposta

```javascript
{
    "id": UUIDv4,
    "title": "string",
    "description": "string",
    "createdAt": datetime,
    "updatedAt": datetime,
    "tasks": [
        {
            "id": UUIDv4,
            "title": "string",
            "taskRelevance": integer,
            "completed": boolean,
            "createdAt": datetime,
            "updatedAt": datetime
        }
    ]
}
```
---
### Atualiação de projetos

PUT /project/`:id`

Permite o envio de dados a serem atualizados, além do identificador do projeto, recebendo como resposta o projeto atualizado. Em caso de nenhum projeto ser encontrado se retorna mensagem de erro e código 404.

A URL da requisição deve conter o UUIDv4 desejado.

Exemplo de identificador: `dd688f0b-a460-46c5-a2bc-ccfbf8f85959`

O corpo da requisição deve ser no formato JSON e pode incluir os campos:

- `title` - opcional
- `description` - opcional

Modelo de resposta

```javascript
{
    "id": "dd688f0b-a460-46c5-a2bc-ccfbf8f85959",
    "title": "Controle de estoque",
    "description": "Responsável por acompanhar o fluxo de mercadorias da empresa. Deve documentar e analisar as informações das vendas realizadas",
    "createdAt": "2022-01-06T12:32:51.000Z",
    "updatedAt": "2022-01-06T12:34:42.000Z"
}
```
---
### Exclusão de projeto

DELETE /project/`:id`

Permite a exclusão de um projeto com base em seu identificador, retornando corpo vazio com código 204 em caso de sucesso e 404 em caso de inexistência do registro na base de dados. A exclusão de um projeto realiza o processo de cascata em suas tarefas.

A URL da requisição deve conter o UUIDv4 desejado.

Exemplo de identificador: `dd688f0b-a460-46c5-a2bc-ccfbf8f85959`

---
### Adição de tasks a um projeto

POST /project/`:id`/task

Permite o envio de uma nova task a um projeto existente, baseado no identificador, recebendo o registro realizado como resposta à requisição. Todos os campos são obrigatórios.

A URL da requisição deve conter o UUIDv4 desejado.

Exemplo de identificador: `dd688f0b-a460-46c5-a2bc-ccfbf8f85959`

O corpo da requisição deve ser no formato JSON e incluir os campos:

- `title`
- `taskRelevance`
- `completed`

Exemplo de envio

```javascript
{
    "title": "string",
    "taskRelevance": integer,
    "completed": boolean
}
```

Exemplo de retorno

```javascript
{
    "id": "a8d01f61-bbac-4e6e-ada2-eefc6698456c",
    "title": "desenvolver endpoint para cadastro de produto",
    "taskRelevance": 10,
    "completed": false,
    "projeto_id": "dd688f0b-a460-46c5-a2bc-ccfbf8f85959",
    "updatedAt": "2022-01-06T12:32:51.557Z",
    "createdAt": "2022-01-06T12:32:51.557Z"
}
```

---
### Atualizar task

PUT /project/task/`:taskId`

Permite o envio de dados a serem atualizados, além do identificador da task, recebendo como resposta o objeto atualizado. Em caso de nenhuma taref ser encontrada se retorna mensagem de erro e código 404.

A URL da requisição deve conter o UUIDv4 desejado.

Exemplo de identificador: `dd688f0b-a460-46c5-a2bc-ccfbf8f85959`

O corpo da requisição deve ser no formato JSON e pode incluir os campos:

- `title` - opcional (string)
- `taskRelevance` - opcional (integer)
- `completed` - opcional (boolean)

Modelo de resposta

```javascript
{
    "id": "a8d01f61-bbac-4e6e-ada2-eefc6698456c",
    "title": "desenvolver endpoint para cadastro de produto",
    "taskRelevance": 10,
    "completed": false,
    "projeto_id": "dd688f0b-a460-46c5-a2bc-ccfbf8f85959",
    "updatedAt": "2022-01-06T12:32:51.557Z",
    "createdAt": "2022-01-06T12:32:51.557Z"
}
```

---

### Exclusão de projeto

DELETE /project/task/`:taskId`

Permite a exclusão de uma task com base em seu identificador, retornando corpo vazio com código 204 em caso de sucesso e 404 em caso de inexistência do registro na base de dados. A exclusão de uma tarefa não realiza o processo de cascata em seu projeto.

A URL da requisição deve conter o UUIDv4 desejado.

Exemplo de identificador: `dd688f0b-a460-46c5-a2bc-ccfbf8f85959`

---