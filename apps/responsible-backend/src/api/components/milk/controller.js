const yup = require('yup')
const { createMilk, updateMilk, deleteMilk, getMilks } = require('./service')

const milkSchema = yup.object({
    size: yup.number('milk size must be number').required('Milk Size is required'),
    entryDate: yup.date().max(new Date(), 'Entry Date cannot be in the future').required('entry Date is required')
})
exports.createMilk = async (req, res, next) => {
    const { size, entryDate } = req.body
    try {
        await milkSchema.validate({ size, entryDate }, { abortEarly: false })
        const milk = await createMilk({ addedBy: req.user.fullName, size, entryDate })
        res.status(201).json({ milk })
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

const updateMilkSchema = yup.object({
    size: yup.number().typeError('you must specify a number').positive('Must be a positive number.').min(1, 'Milk size must be greater than or equal to 1').required('Milk Size must be Number'),
    entryDate: yup.date().max(new Date(), 'Entry Date cannot be in the future').required('entry Date is required')
})
exports.updateMilk = async (req, res, next) => {
    const { size, entryDate } = req.body
    const { id } = req.params
    try {
        await updateMilkSchema.validate({ size, entryDate }, { abortEarly: false })
        const Milk = await updateMilk({ id, body: req.body })
        res.status(201).json({ Milk })
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

exports.deleteMilk = async (req, res, next) => {
    const { id } = req.params
    try {
        await deleteMilk(id)
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

exports.getMilks = async (req, res, next) => {
    try {
        const milks = await getMilks()
        res.status(200).json({ milks })
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
