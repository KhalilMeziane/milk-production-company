const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const { readData, saveData } = require('../../../db/db')

exports.createMilk = ({ addedBy, size, entryDate }) => {
    const milk = {
        id: uuidv4(),
        addedBy,
        size,
        entryDate
    }
    return new Promise((resolve, reject) => {
        try {
            const { milks, ...data } = readData()
            const isMatchDate = milks.find(milk => milk.entryDate === entryDate)
            if (isMatchDate) {
                return reject(createError.Conflict('Date is already Register'))
            }
            milks.push(milk)
            saveData({ ...data, milks })
            return resolve(milk)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.updateMilk = ({ id, body }) => {
    return new Promise((resolve, reject) => {
        try {
            const { milks, ...data } = readData()
            const isMatchDate = milks.find(milk => milk.id !== id && milk.entryDate === body.entryDate)
            if (isMatchDate) {
                return reject(createError.Conflict('Date is already Register'))
            }

            const targetMilkDay = milks.find(milk => milk.id === id)
            if (!targetMilkDay) {
                return reject(createError.NotFound())
            }
            const milkList = milks.map(milk => {
                if (milk.id !== id) {
                    return milk
                } else {
                    return {
                        ...milk,
                        ...body
                    }
                }
            })
            saveData({ ...data, milks: milkList })
            return resolve(milkList.find(cow => cow.id === id))
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.deleteMilk = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const { milks, ...data } = readData()
            const targetMilk = milks.find(milk => milk.id === id)
            if (!targetMilk) {
                return reject(createError.NotFound())
            }
            const filteredMilks = milks.filter(cow => cow.id !== id)
            saveData({ ...data, milks: filteredMilks })
            return resolve()
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.getMilks = () => {
    return new Promise((resolve, reject) => {
        try {
            const { milks } = readData()
            return resolve(milks)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}
