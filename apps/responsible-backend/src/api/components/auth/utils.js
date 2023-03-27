const argon2 = require('argon2')
const JWT = require('jsonwebtoken')
const createError = require('http-errors')

exports.hashPassword = async (password) => {
    try {
        return await argon2.hash(password)
    } catch (error) {
        console.log('error when try to hash password: ', error)
        return error
    }
}

exports.comparePassword = async function (hashPassword, password) {
    try {
        const check = await argon2.verify(hashPassword, password)
        if (!check) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log('error when try to comparePassword password: ', error)
        return error
    }
}

exports.signAccessToken = ({ id }) => {
    return new Promise((resolve, reject) => {
        const payload = { id }
        const options = { expiresIn: '1d' }
        JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (error, token) => {
            if (error) {
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

exports.signRefreshToken = ({ id }) => {
    return new Promise((resolve, reject) => {
        const payload = { id }
        const options = { expiresIn: '1y' }
        JWT.sign(payload, process.env.REFRESH_TOKEN_SECRET, options, (error, token) => {
            if (error) {
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

exports.verifyAccessToken = (accessToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
            if (error) {
                return reject(createError.Unauthorized())
            }
            const { id } = payload
            resolve({ id })
        })
    })
}

exports.verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
            if (error) {
                return reject(createError.Unauthorized())
            }
            const { id } = payload
            resolve({ id })
        })
    })
}
