const yup = require('yup')
const { createExamination, updateExamination, deleteExamination, getExamination } = require('./service')

const examinationSchema = yup.object({
    entryDate: yup.date().max(new Date(), 'Entry Date cannot be in the future').required('entry Date is required'),
    cowId: yup.string().required('cow Id is required'),
    disease: yup.string().oneOf(['Bluetongue', 'Botulism', 'Brucellosis'], 'Invalid option selected').required('Disease is required')
})
exports.createExamination = async (req, res, next) => {
    try {
        await examinationSchema.validate(req.body, { abortEarly: false })
        const examination = await createExamination({ addedBy: req.user.fullName, body: req.body })
        res.status(201).json({ examination })
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}

const updateExaminationSchema = yup.object({
    entryDate: yup.date().max(new Date(), 'Entry Date cannot be in the future').required('entry Date is required'),
    disease: yup.string().oneOf(['Bluetongue', 'Botulism', 'Brucellosis'], 'Invalid option selected').required('Disease is required')
})
exports.updateExamination = async (req, res, next) => {
    const { id } = req.params
    try {
        await updateExaminationSchema.validate(req.body, { abortEarly: false })
        const examination = await updateExamination({ id, body: req.body })
        res.status(201).json({ examination })
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}

exports.deleteExamination = async (req, res, next) => {
    const { id } = req.params
    try {
        await deleteExamination(id)
        res.status(204).json()
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}

exports.getExamination = async (req, res, next) => {
    const { id } = req.params
    try {
        const examinations = await getExamination(id)
        res.status(200).json({ examinations })
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}
