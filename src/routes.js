const { Router } = require('express')
const request = require('request')
const service = require('./service.js')
const bodyParser = require('body-parser')

/** @type {Router} */
const router = new Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/mutant', (req, res) => {
    const {dna} = req.body

    service.verifyAndSaveDna(dna)
        .then((isMutant) => {
            res.status(isMutant? 200 : 403).json({isMutant})
        })
        .catch((err) => {
            res.status(500).json({ message: 'Unknown server error: '+err.message })
        })

})

router.get('/stats', (req, res) => {
    service.getStats()
        .then((data) => {
            res.status(200).json({data})
        })
        .catch((err) => {
            res.status(500).json({ message: 'Unknown server error: '+err.message })
        })

})


module.exports = router
