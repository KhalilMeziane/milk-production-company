const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const dbUri = path.join(__dirname, '/../../../db', 'db.json')

exports.createMilk = ({ addedBy, size, entryDate }) => {
    const milk = {
        id: uuidv4(),
        addedBy,
        size,
        entryDate
    }
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const isMatchDate = data.milks.find(milk => milk.entryDate === entryDate)
            if (isMatchDate) {
                return reject(createError.Conflict('Date is already Register'))
            }
            data.milks.push(milk)
            fs.writeFile(dbUri, JSON.stringify({ ...data }), 'utf8', (err) => {
                if (err) throw err
            })
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
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { milks } = data

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
            fs.writeFile(dbUri, JSON.stringify({ ...data, milks: milkList }), 'utf8', (err) => {
                if (err) throw err
            })
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
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { milks } = data
            const targetMilk = milks.find(milk => milk.id === id)
            if (!targetMilk) {
                return reject(createError.NotFound())
            }
            const filteredMilks = milks.filter(cow => cow.id !== id)
            fs.writeFile(dbUri, JSON.stringify({ ...data, milks: filteredMilks }), 'utf8', (err) => {
                if (err) throw err
            })
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
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { milks } = data
            return resolve(milks)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}
