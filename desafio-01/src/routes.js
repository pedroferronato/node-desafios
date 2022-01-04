const bodyParser = require('body-parser')
const { Router } = require('express')

// controller

const router = Router()

router.get('/', (req, res) => {
    res.send('ok')
})

module.exports = app => {
    app.use(
        bodyParser.json(),
        router
    )
}