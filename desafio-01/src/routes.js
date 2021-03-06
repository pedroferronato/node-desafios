const express = require('express')

const ProjetosController = require('./controllers/ProjetosController')

const router = express.Router()

router
    .get('/project', ProjetosController.selectAllProjetos) // Buscar todos os projetos
    .get('/project/:id', ProjetosController.selectByIdProjeto) // Buscar projeto por id
    .post('/project', ProjetosController.insertProjeto) // Adicionar projeto (Com possibilidades de tasks)
    .put('/project/:id', ProjetosController.updateProjetoById) // Atualizar projeto
    .delete('/project/:id', ProjetosController.deleteProjetoById) // Excluir projeto
    .post('/project/:id/task', ProjetosController.addTaskInProjeto) // Adiciona task a um projeto existente 
    .delete('/project/task/:taskId', ProjetosController.deleteTaskById) // Excluir task por id
    .put('/project/task/:taskId', ProjetosController.updateTaskById) // Atualizar task por id 

module.exports = app => {
    app.use(express.json())

    app.use('/api', router)
}