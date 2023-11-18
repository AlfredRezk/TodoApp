"use strict"

require('dotenv').config()
const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------------- */
const swaggerAutogen = require('swagger-autogen')()
const packageJson = require('./package.json')

const document = {
	info: {
		version: packageJson.version,
		title: packageJson.title,

		contact: { name: packageJson.author, email: packageJson.email },
		license: { name: packageJson.license },
	},
	host: `${HOST}:${PORT}`,
	basePath: '/',
	schemes: ['http', 'https'],
	consumes: ["application/json"],
	produces: ["application/json"],
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
			description: 'JWT Authentication * Example: <b>Bearer ...accessToken...</b>'
		},
	},
	security: [ { Bearer: [] }],
	definition: {
		// Models:
		"User": require('./models/User').schema.obj,
		"Category": require('./models/Category').schema.obj,
		"Todo": require('./models/Todo').schema.obj,
	}
}

const routes = ['./index.js']
const outputFile = './config/swagger.json'

// Create JSON file:
swaggerAutogen(outputFile, routes, document)