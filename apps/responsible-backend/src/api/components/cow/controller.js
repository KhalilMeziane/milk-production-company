const yup = require('yup')
const { createCow, updateCow, deleteCow, getCows } = require('./service')

const cowSchema = yup.object({
    breed: yup.string().min(6).max(255).required('breed field is required')
})
exports.createCow = async (req, res, next) => {
    const { breed, entryDate } = req.body
    try {
        await cowSchema.validate({ breed, entryDate }, { abortEarly: false })
        const cow = await createCow({ addedBy: req.user.fullName, breed, entryDate })
        res.status(201).json({ cow })
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

const updateCowSchema = yup.object({
    breed: yup.string().min(6).max(255).required('breed field is required')
})
exports.updateCow = async (req, res, next) => {
    const { breed, entryDate } = req.body
    const { id } = req.params
    try {
        await updateCowSchema.validate({ breed, entryDate }, { abortEarly: false })
        const cow = await updateCow({ id, body: req.body })
        res.status(201).json({ cow })
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

exports.deleteCow = async (req, res, next) => {
    const { id } = req.params
    try {
        await deleteCow(id)
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

exports.getCows = async (req, res, next) => {
    try {
        const cows = await getCows()
        res.status(200).json({ cows })
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
