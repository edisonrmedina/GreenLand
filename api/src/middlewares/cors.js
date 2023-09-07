const { Router } = require('express')
require('dotenv').config()
const { CLIENT_URL } = process.env

const router = Router()

router.use((req, res, next) => {
  const origin = req.header('origin')
  if (CLIENT_URL === origin || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  }

  next()
})

module.exports = router
