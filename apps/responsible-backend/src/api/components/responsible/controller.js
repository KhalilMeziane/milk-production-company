const yup = require('yup')
const { createResponsible, deleteResponsible, getResponsibles } = require('./service')

const createAccount = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required'),
    fullName: yup.string().min(6, 'Minium 8 characters').max(30, 'Maximum 30 characters').required('full Name is required'),
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
    try {
        const users = await getResponsibles()
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
