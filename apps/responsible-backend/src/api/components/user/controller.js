const yup = require('yup')
const { createUser, deleteUser } = require('./service')

const createAccount = yup.object({
    fullName: yup.string().min(6).max(255).required('full name field is required'),
    email: yup.string().email('email filed is not valid email').max(255).required('email field is required'),
    password: yup.string().min(6).max(255).required('password field is required'),
    role: yup.string().oneOf(['admin', 'moderator'], 'Invalid Role selected Option').required('role field is required')
})
exports.createUser = async (req, res, next) => {
    const { email, password, fullName, role } = req.body
    try {
        await createAccount.validate({ email, password, fullName, role }, { abortEarly: false })
        const user = await createUser({ email, password, fullName, role })
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

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        await deleteUser({ id })
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
