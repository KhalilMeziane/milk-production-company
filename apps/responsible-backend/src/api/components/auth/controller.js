const yup = require('yup')
const createError = require('http-errors')
const { login, logout, refreshTokens } = require('./service')
const { verifyRefreshToken } = require('./utils')

const loginSchema = yup.object({
    email: yup.string().email('email filed is not valid email').max(255).required('email field is required'),
    password: yup.string().min(6).max(255).required('password field is required')
})
exports.login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        await loginSchema.validate({ email, password }, { abortEarly: false })
        const user = await login({ email, password })
        res.status(200).json(user)
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

exports.logout = async (req, res, next) => {
    try {
        await logout(req.user)
        res.status(200).json()
    } catch (error) {
        console.log('C error: ', error)
        next(error)
    }
}

exports.refresh = async (req, res, next) => {
    if (!req.body.refreshToken) {
        next(createError.Unauthorized())
    }
    try {
        const { id } = await verifyRefreshToken(req.body.refreshToken)
        const { accessToken, refreshToken } = await refreshTokens(req.body.refreshToken, id)
        res.status(200).json({ refreshToken, accessToken })
    } catch (error) {
        console.log('C error : ', error)
        next(error)
    }
}
