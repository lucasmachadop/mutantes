const functions = require('firebase-functions')
const cors = require('cors')
const express = require('express')

const routes = require('./routes.js')

const app = express()

app.use(cors())
app.use(routes)

const SERVER_PORT = 3001
app.listen({ port: SERVER_PORT }, () => console.log(`LISTENING ON PORT ${SERVER_PORT}`))

exports.isMutant = functions.https.onRequest((request, response) => {
    if (!request.path) {
        request.url = `/${request.url}` // prepend '/' no final da url para manter os query params
    }
    return app(request, response)
})
