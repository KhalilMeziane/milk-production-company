const router = require('express').Router()
const auth = require('./components/auth/route')
const cow = require('./components/cow/route')
const milk = require('./components/milk/route')
const user = require('./components/user/route')

router.use('/auth', auth)
router.use('/cows', cow)
router.use('/milks', milk)
router.use('/users', user)

module.exports = router
