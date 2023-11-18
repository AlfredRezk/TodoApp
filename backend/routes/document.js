"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/document:
// URL: /documents

router.all('/', (req, res) => {
    res.send({
        swagger: "/api/documents/swagger",
        redoc: "/api/documents/redoc",
        json: "/api/documents/json",
    })
})

// JSON:
router.use('/json', (req, res) => {
    res.sendFile(`/config/swagger.json`, { root: '.' })
})

// Redoc:
const redoc = require('redoc-express')
router.use('/redoc', redoc({ specUrl: '/api/documents/json', title: 'API Docs' }))

// Swagger:
const swaggerUi = require('swagger-ui-express')
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(require('../config/swagger.json'), { swaggerOptions: { persistAuthorization: true } }))

/* ------------------------------------------------------- */
module.exports = router