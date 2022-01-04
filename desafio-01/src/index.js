const express = require('express');
const routes = require('./routes');

const app = express()

routes(app)

app.listen(3000, console.log(`O servidor está em execução`))

module.exports = app