const express = require('express')
const morganMiddleware = require('../config/logger')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const createError = require('http-errors')

require('dotenv').config()

app.use(cors())

app.use(morganMiddleware)

app.use(express.json())

app.use('/api', routes)

app.use((req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            status: err.status,
            message: err.message
        }
    })
})

module.exports = app
