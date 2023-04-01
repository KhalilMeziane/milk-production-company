const router = require('express').Router()
const { getInfo, updateInfo, updatePassword } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.get('/', verifyAuthorization, getInfo)

router.patch('/', verifyAuthorization, updateInfo)

router.patch('/password', verifyAuthorization, updatePassword)

module.exports = router
