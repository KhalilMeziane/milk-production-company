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

exports.comparePassword = (hashPassword, password) => {
    return new Promise((resolve, reject) => {
        return argon2.verify(hashPassword, password)
            .then(check => {
                if (check) {
                    return resolve(true)
                } else {
                    return reject(new Error('Password not match'))
                }
            })
            .catch(error => {
                console.log('error when try to comparePassword password: ', error)
                return reject(error)
            })
    })
}

exports.signAccessToken = ({ id, fullName, role }) => {
    return new Promise((resolve, reject) => {
        const payload = { id, fullName, role }
        const options = { expiresIn: '1d' }
        JWT.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (error, token) => {
            if (error) {
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

exports.signRefreshToken = ({ id, fullName, role }) => {
    return new Promise((resolve, reject) => {
        const payload = { id, fullName, role }
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
            const { id, fullName, role } = payload
            resolve({ id, fullName, role })
        })
    })
}

exports.verifyRefreshToken = (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, payload) => {
            if (error) {
                return reject(createError.Unauthorized())
            }
            const { id, fullName, role } = payload
            resolve({ id, fullName, role })
        })
    })
}
