const router = require('express').Router()
const { createCow, updateCow, deleteCow, getCows } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, createCow)

router.patch('/:id', verifyAuthorization, updateCow)

router.delete('/:id', verifyAuthorization, deleteCow)

router.get('/', verifyAuthorization, getCows)

module.exports = router
