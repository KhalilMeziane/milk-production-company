const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const { comparePassword, signAccessToken, signRefreshToken } = require('./utils')

const dbUri = path.join(__dirname, '/../../../db', 'db.json')

exports.login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
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
                console.log('user from login: ', user)
                return Promise.all([
                    signAccessToken({ id: user.id, fullName: user.fullName }),
                    signRefreshToken({ id: user.id, fullName: user.fullName }),
                    data,
                    targetUser
                ])
            })
            .then(obj => {
                const [accessToken, refreshToken, data, user] = obj
                const newUsers = data.users.map(user => {
                    if (user.email === email) {
                        return {
                            ...user,
                            refreshToken
                        }
                    } else {
                        return user
                    }
                })
                fs.writeFile(dbUri, JSON.stringify({ ...data, users: newUsers }), 'utf8', (err) => {
                    if (err) throw err
                })
                return resolve({ ...user, accessToken, refreshToken })
            })
            .catch(error => {
                console.log('S error: ', error)
                reject(createError.InternalServerError())
            })
    })
}

exports.logout = async ({ id }) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
        const targetUser = users.find(user => user.id === id)
        if (!targetUser) {
            reject(createError.Conflict('Credentials is not found'))
        }
        const { refreshToken, ...user } = targetUser
        const newUsers = data.users.map(itemUser => {
            if (itemUser.id === id) {
                return { ...user }
            } else {
                return itemUser
            }
        })
        fs.writeFile(dbUri, JSON.stringify({ ...data, users: newUsers }), 'utf8', (err) => {
            if (err) throw err
        })
        return resolve()
    })
}

exports.refreshTokens = async (refreshToken, id) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
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
                const newUsers = data.users.map(user => {
                    if (user.id === id) {
                        return {
                            ...user,
                            refreshToken
                        }
                    } else {
                        return user
                    }
                })
                fs.writeFile(dbUri, JSON.stringify({ ...data, users: newUsers }), 'utf8', (err) => {
                    if (err) throw err
                })
                return resolve({ accessToken, refreshToken })
            })
            .catch(error => {
                console.log('S error: ', error)
                reject(createError.InternalServerError())
            })
    })
}
