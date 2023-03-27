const router = require('express').Router()
const { createUser, login, logout, refresh } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.post('/login', login)

router.post('/create', createUser)

router.get('/logout', verifyAuthorization, logout)

router.post('/refresh', refresh)

module.exports = router
