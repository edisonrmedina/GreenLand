const { Router } = require('express')
const filterProduct = require('../controllers/filters/filterProduct')
const router = Router()

router.post('/', filterProduct)

module.exports = router
