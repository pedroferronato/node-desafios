const bodyParser = require('body-parser')
const { Router } = require('express')

const ProjetosController = require('./controllers/ProjetosController')

const router = Router()

router.get('/project', (req, res) => res.send({ msg: "Not implemented yet" }))
    .get('/project/:id', (req, res) => res.send({ msg: "Not implemented yet" }))
    .post('/project', ProjetosController.insertProjeto)
    .put('/project/:id', (req, res) => res.send({ msg: "Not implemented yet" }))
    .delete('/project/:id', (req, res) => res.send({ msg: "Not implemented yet" }))

module.exports = app => {
    app.use(bodyParser.json())

    app.use('/api', router)
}