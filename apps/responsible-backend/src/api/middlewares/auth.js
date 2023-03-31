const createError = require('http-errors')
const { verifyAccessToken } = require('../components/auth/utils')

exports.verifyAuthorization = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers.authorization
    const bearerToken = authHeader.split(' ')
    const accessToken = bearerToken[1]
    try {
        const user = await verifyAccessToken(accessToken)
        req.user = user
        next()
    } catch (error) {
        return next(createError.Unauthorized())
    }
}

exports.verifyIsAdmin = async (req, res, next) => {
    const { role } = req.user
    if (role === 'admin') {
        next()
    } else {
        return next(createError.Unauthorized())
    }
}
