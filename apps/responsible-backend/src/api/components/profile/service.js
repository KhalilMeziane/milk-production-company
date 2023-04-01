const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const { signAccessToken, signRefreshToken, hashPassword, comparePassword } = require('../auth/utils')

const dbUri = path.join(__dirname, '/../../../db', 'db.json')

exports.getInfo = (id) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
        const user = users.find(user => user.id === id)
        if (!user) {
            return reject(createError.BadRequest('Invalid email or password'))
        }
        return resolve(user)
    })
}

exports.updateInfo = ({ id, body }) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
        const user = users.find(user => user.id === id)
        if (!user) {
            return reject(createError.NotFound())
        }
        const isMatchCredentials = users.find(user => user.id !== id && user.email === body.email)
        if (isMatchCredentials) {
            return reject(createError.Conflict('Credentials is already taken'))
        }
        return Promise.all([
            signAccessToken({ id: user.id, fullName: body.fullName, role: user.role }),
            signRefreshToken({ id: user.id, fullName: body.fullName, role: user.role })
        ])
            .then(tokens => {
                const [accessToken, refreshToken] = tokens
                const usersList = users.map(user => {
                    if (user.id !== id) {
                        return user
                    } else {
                        return {
                            ...user,
                            ...body,
                            refreshToken
                        }
                    }
                })
                fs.writeFile(dbUri, JSON.stringify({ ...data, users: usersList }), 'utf8', (err) => {
                    if (err) throw err
                })
                const { password, ...targetUser } = usersList.find(user => user.id === id)
                return resolve({ ...targetUser, accessToken })
            })
            .catch(error => {
                console.log('S error: ', error)
                return reject(createError.InternalServerError())
            })
    })
}

exports.updatePassword = ({ id, body }) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
        const user = users.find(user => user.id === id)
        if (!user) {
            return reject(createError.NotFound())
        }
        return comparePassword(user.password, body.oldPassword)
            .then(match => {
                if (!match) {
                    return reject(createError.BadRequest('Password Not Match'))
                }
                return hashPassword(body.newPassword)
            })
            .then(hash => {
                const usersList = users.map(user => {
                    if (user.id !== id) {
                        return user
                    } else {
                        return {
                            ...user,
                            password: hash
                        }
                    }
                })
                fs.writeFile(dbUri, JSON.stringify({ ...data, users: usersList }), 'utf8', (err) => {
                    if (err) throw err
                })
                return resolve()
            })
            .catch(error => {
                console.log('S error: ', error)
                return reject(createError.InternalServerError())
            })
    })
}
