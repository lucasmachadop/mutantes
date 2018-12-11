const functions = require('firebase-functions')
const cors = require('cors')
const express = require('express')
const config = require('./environment')
const routes = require('./routes.js')

const app = express()

app.use(cors())
app.use(routes)

const isDevelopmentEnv = () => config.local? config.local.dev: false

if (isDevelopmentEnv()) {
    app.listen({ port: config.local.port }, () => console.log(`LISTENING ON PORT ${config.local.port}`))
} else {
    exports.xmen = functions.https.onRequest((request, response) => {
        if (!request.path) {
            request.url = `/${request.url}`
        }
        return app(request, response)
    })
}
