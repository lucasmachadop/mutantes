const { Router } = require('express')
const request = require('request')
const service = require('./service.js')
const bodyParser = require('body-parser')

/** @type {Router} */
const router = new Router()

router.use(bodyParser.json())

router.post('/ismutant', (req, res) => {
    const {dna} = req.body

    service.isMutant(dna)
        .then((data) => {
            res.status(200).json({isMutant:data})
        })
        .catch((err) => {
            res.status(500).json({ message: 'Unknown server error: '+err.message })
        })

})


module.exports = router
