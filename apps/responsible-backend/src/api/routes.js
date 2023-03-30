const router = require('express').Router()
const auth = require('./components/auth/route')
const cow = require('./components/cow/route')

router.use('/auth', auth)
router.use('/cows', cow)

module.exports = router
