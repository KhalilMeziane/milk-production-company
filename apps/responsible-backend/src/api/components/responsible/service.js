const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const { hashPassword } = require('../auth/utils')
const { readData, saveData } = require('../../../db/db')

exports.createResponsible = async ({ email, password, fullName, role }) => {
    return new Promise((resolve, reject) => {
        const { users, ...data } = readData()
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
                    role,
                    createdAt: new Date().toISOString().split('T')[0]
                }
                users.push(newUser)
                const { password, ...user } = newUser
                saveData({ ...data, users })
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
        const { users, ...data } = readData()
        const targetUser = users.find(user => user.id === id)
        if (!targetUser) {
            reject(createError.Conflict('Credentials is not found'))
        }
        const filteredUsers = users.filter(user => user.id !== id)
        saveData({ ...data, users: filteredUsers })
        return resolve()
    })
}

exports.getResponsibles = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const { users } = readData()
            const filteredList = users.filter(user => user.id !== id)
            return resolve(filteredList)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.updateResponsible = async ({ id, role }) => {
    return new Promise((resolve, reject) => {
        try {
            const { users, ...data } = readData()
            const targetUser = users.find(user => user.id === id)
            if (!targetUser) {
                reject(createError.Conflict('Credentials is not found'))
            }
            const usersList = users.map(user => {
                if (user.id === id) {
                    return {
                        ...user,
                        role
                    }
                } else {
                    return user
                }
            })
            saveData({ ...data, users: usersList })
            return resolve({ ...targetUser, role })
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}
