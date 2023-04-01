const yup = require('yup')
const { getInfo, updateInfo, updatePassword } = require('./service')

exports.getInfo = async (req, res, next) => {
    const { id } = req.user
    try {
        const profile = await getInfo(id)
        res.status(200).json({ profile })
    } catch (error) {
        console.log('C error: ', error)
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}

const updateInfoSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    fullName: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('full Name is required')
})
exports.updateInfo = async (req, res, next) => {
    const { id } = req.user
    try {
        await updateInfoSchema.validate(req.body, { abortEarly: false })
        const profile = await updateInfo({ id, body: req.body })
        res.status(201).json({ ...profile })
    } catch (error) {
        console.log('C error: ', error)
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}

const updatePasswordSchema = yup.object().shape({
    newPassword: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required'),
    oldPassword: yup.string().min(6, 'Minium 6 characters').max(30, 'Maximum 30 characters').required('Password is required')
})
exports.updatePassword = async (req, res, next) => {
    const { id } = req.user
    try {
        await updatePasswordSchema.validate(req.body, { abortEarly: false })
        await updatePassword({ id, body: req.body })
        res.status(201).json()
    } catch (error) {
        console.log('C error: ', error)
        if (error.errors) {
            error.status = 400
        }
        next({
            message: error.errors,
            status: error.status || 500
        })
    }
}
