const router = require('express').Router()
const auth = require('./components/auth/route')
const cow = require('./components/cow/route')
const milk = require('./components/milk/route')
const responsible = require('./components/responsible/route')
const examination = require('./components/examination/route')
const profile = require('./components/profile/route')

router.use('/auth', auth)
router.use('/cows', cow)
router.use('/milks', milk)
router.use('/responsibles', responsible)
router.use('/examinations', examination)
router.use('/profile', profile)

module.exports = router
