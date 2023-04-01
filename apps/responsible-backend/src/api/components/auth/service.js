const createError = require('http-errors')
const { comparePassword, signAccessToken, signRefreshToken } = require('./utils')
const { readData, saveData } = require('../../../db/db')

exports.login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        const { users, ...data } = readData()
        const user = users.find(user => user.email === email)
        if (!user) {
            reject(createError.BadRequest('Invalid email or password'))
        }
        return comparePassword(user.password, password)
            .then(match => {
                if (!match) {
                    return reject(createError.BadRequest('Invalid email or password'))
                }
                const { password, ...targetUser } = user
                return Promise.all([
                    signAccessToken({ id: user.id, fullName: user.fullName, role: user.role }),
                    signRefreshToken({ id: user.id, fullName: user.fullName, role: user.role }),
                    targetUser
                ])
            })
            .then(obj => {
                const [accessToken, refreshToken, targetUser] = obj
                const newUsers = users.map(user => {
                    if (user.email === email) {
                        return {
                            ...user,
                            refreshToken
                        }
                    } else {
                        return user
                    }
                })
                saveData({ ...data, users: newUsers })
                return resolve({ ...targetUser, accessToken, refreshToken })
            })
            .catch(error => {
                console.log('S error: ', error)
                reject(createError.InternalServerError())
            })
    })
}

exports.logout = async ({ id }) => {
    return new Promise((resolve, reject) => {
        const { users, ...data } = readData()
        const targetUser = users.find(user => user.id === id)
        if (!targetUser) {
            reject(createError.Conflict('Credentials is not found'))
        }
        const { refreshToken, ...user } = targetUser
        const newUsers = users.map(itemUser => {
            if (itemUser.id === id) {
                return { ...user }
            } else {
                return itemUser
            }
        })
        saveData({ ...data, users: newUsers })
        return resolve()
    })
}

exports.refreshTokens = async (refreshToken, id) => {
    return new Promise((resolve, reject) => {
        const { users, ...data } = readData()
        const user = users.find(user => user.id === id)
        if (!user.refreshToken || user.refreshToken !== refreshToken) {
            reject(createError.Unauthorized())
        }
        return Promise.all([
            signAccessToken({ id }),
            signRefreshToken({ id })
        ])
            .then(tokens => {
                const [accessToken, refreshToken] = tokens
                const newUsers = users.map(user => {
                    if (user.id === id) {
                        return {
                            ...user,
                            refreshToken
                        }
                    } else {
                        return user
                    }
                })
                saveData({ ...data, users: newUsers })
                return resolve({ accessToken, refreshToken })
            })
            .catch(error => {
                console.log('S error: ', error)
                reject(createError.InternalServerError())
            })
    })
}
