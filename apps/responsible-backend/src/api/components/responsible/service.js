const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const { hashPassword } = require('./utils')

const dbUri = path.join(__dirname, '/../../../db', 'db.json')

exports.createResponsible = async ({ email, password, fullName, role }) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
        const user = users.find(user => user.email === email)
        if (user) {
            return reject(createError.Conflict('Credentials is already registered'))
        }
        return hashPassword(password)
            .then(hash => {
                const newUser = {
                    id: uuidv4(),
                    fullName,
                    email,
                    password: hash,
                    role
                }
                data.users.push(newUser)
                const { password, ...user } = newUser
                fs.writeFile(dbUri, JSON.stringify({ ...data }), 'utf8', (err) => {
                    if (err) throw err
                })
                return resolve(user)
            })
            .catch(error => {
                console.log('S error: ', error)
                reject(createError.InternalServerError())
            })
    })
}

exports.deleteResponsible = async ({ id }) => {
    return new Promise((resolve, reject) => {
        const db = fs.readFileSync(dbUri)
        const data = JSON.parse(db)
        const { users } = data
        const targetUser = users.find(user => user.id === id)
        if (!targetUser) {
            reject(createError.Conflict('Credentials is not found'))
        }
        const filteredUsers = users.filter(user => user.id !== id)
        fs.writeFile(dbUri, JSON.stringify({ ...data, users: filteredUsers }), 'utf8', (err) => {
            if (err) throw err
        })
        return resolve()
    })
}
