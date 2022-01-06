const bodyParser = require('body-parser')
const { Router } = require('express')

const ProjetosController = require('./controllers/ProjetosController')

const router = Router()

router.get('/project', ProjetosController.selectAllProjetos)
    .get('/project/:id', ProjetosController.selectByIdProjeto)
    .post('/project', ProjetosController.insertProjeto)
    .put('/project/:id', (req, res) => res.send({ msg: "Not implemented yet" }))
    .delete('/project/:id', ProjetosController.deleteProjetoById)

module.exports = app => {
    app.use(bodyParser.json())

    app.use('/api', router)
}