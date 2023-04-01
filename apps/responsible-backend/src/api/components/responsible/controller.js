const yup = require('yup')
const { createResponsible, deleteResponsible, getResponsibles, updateResponsible } = require('./service')

const createAccount = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required'),
    fullName: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('full Name is required'),
    role: yup.string().oneOf(['admin', 'moderator'], 'Invalid option selected').required('User Role is required')
})
exports.createResponsible = async (req, res, next) => {
    const { email, password, fullName, role } = req.body
    try {
        await createAccount.validate({ email, password, fullName, role }, { abortEarly: false })
        const user = await createResponsible({ email, password, fullName, role })
        res.status(201).json({ user })
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors || error,
            status: error.status || 500
        })
    }
}

exports.deleteResponsible = async (req, res, next) => {
    const { id } = req.params
    try {
        await deleteResponsible({ id })
        res.status(201).json()
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors || error,
            status: error.status || 500
        })
    }
}

exports.getResponsibles = async (req, res, next) => {
    const { id } = req.user
    try {
        const users = await getResponsibles(id)
        res.status(200).json({ users })
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

const updateSchema = yup.object().shape({
    role: yup.string().oneOf(['admin', 'moderator'], 'Invalid option selected').required('User Role is required')
})
exports.updateResponsible = async (req, res, next) => {
    const { id } = req.params
    const { role } = req.body
    try {
        await updateSchema.validate(req.body, { abortEarly: false })
        const user = await updateResponsible({ id, role })
        res.status(201).json({ user })
    } catch (error) {
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors || error,
            status: error.status || 500
        })
    }
}
