const router = require('express').Router()
const { createResponsible, deleteResponsible } = require('./controller')
const { verifyAuthorization, verifyIsAdmin } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, verifyIsAdmin, createResponsible)

router.delete('/', verifyAuthorization, verifyIsAdmin, deleteResponsible)

module.exports = router
