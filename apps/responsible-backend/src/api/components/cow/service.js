const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const { readData, saveData } = require('../../../db/db')

exports.createCow = ({ addedBy, breed, entryDate, motherId }) => {
    const cow = {
        id: uuidv4(),
        addedBy,
        breed,
        entryDate,
        motherId,
        origin: motherId ? 'farm' : 'importer'
    }
    return new Promise((resolve, reject) => {
        try {
            const { cows, ...data } = readData()
            cows.push(cow)
            saveData({ ...data, cows })
            return resolve(cow)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.updateCow = ({ id, body }) => {
    return new Promise((resolve, reject) => {
        try {
            const { cows, ...data } = readData()
            const targetCow = cows.find(cow => cow.id === id)
            if (!targetCow) {
                return reject(createError.NotFound())
            }
            const cowsList = cows.map(cow => {
                if (cow.id !== id) {
                    return cow
                } else {
                    return {
                        ...cow,
                        ...body
                    }
                }
            })
            saveData({ ...data, cows: cowsList })
            return resolve(cowsList.find(cow => cow.id === id))
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.deleteCow = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const { cows, ...data } = readData()
            const targetCow = cows.find(cow => cow.id === id)
            if (!targetCow) {
                return reject(createError.NotFound())
            }
            const filteredCows = cows.filter(cow => cow.id !== id)
            saveData({ ...data, cows: filteredCows })
            return resolve()
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.getCows = () => {
    return new Promise((resolve, reject) => {
        try {
            const { cows } = readData()
            return resolve(cows)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}
