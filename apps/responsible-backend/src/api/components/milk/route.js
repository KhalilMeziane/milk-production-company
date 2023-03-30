const router = require('express').Router()
const { createMilk, updateMilk, deleteMilk, getMilks } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, createMilk)

router.patch('/:id', verifyAuthorization, updateMilk)

router.delete('/:id', verifyAuthorization, deleteMilk)

router.get('/', verifyAuthorization, getMilks)

module.exports = router
