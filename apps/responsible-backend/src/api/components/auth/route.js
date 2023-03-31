const router = require('express').Router()
const { login, logout, refresh } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.post('/login', login)

router.get('/logout', verifyAuthorization, logout)

router.post('/refresh', refresh)

module.exports = router
