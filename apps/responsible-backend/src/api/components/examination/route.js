const router = require('express').Router()
const { createExamination, updateExamination, deleteExamination, getExamination } = require('./controller')
const { verifyAuthorization } = require('../../middlewares/auth')

router.post('/', verifyAuthorization, createExamination)

router.patch('/:id', verifyAuthorization, updateExamination)

router.delete('/:id', verifyAuthorization, deleteExamination)

router.get('/:id', verifyAuthorization, getExamination)

module.exports = router
