const router = require('express').Router()
const { createUser, deleteUser } = require('./controller')
const { verifyAuthorization, verifyIsAdmin } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, verifyIsAdmin, createUser)

router.delete('/', verifyAuthorization, verifyIsAdmin, deleteUser)

module.exports = router
