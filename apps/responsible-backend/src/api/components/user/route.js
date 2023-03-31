const router = require('express').Router()
const { createUser, deleteUser } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, createUser)

router.delete('/', verifyAuthorization, deleteUser)

module.exports = router
