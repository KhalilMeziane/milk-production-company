const router = require('express').Router()
const auth = require('./components/auth/route')

router.use('/auth', auth)

module.exports = router
