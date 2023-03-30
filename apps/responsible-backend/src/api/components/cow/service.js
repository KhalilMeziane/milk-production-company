const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const dbUri = path.join(__dirname, '/../../../db', 'db.json')

exports.createCow = ({ addedBy, breed, entryDate }) => {
    const cow = {
        id: uuidv4(),
        addedBy,
        breed,
        entryDate
    }
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            data.cows.push(cow)
            fs.writeFile(dbUri, JSON.stringify({ ...data }), 'utf8', (err) => {
                if (err) throw err
            })
            resolve(cow)
        } catch (error) {
            console.log('S error: ', error)
            reject(createError.InternalServerError())
        }
    })
}

exports.updateCow = ({ id, body }) => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { cows } = data
            const newCows = cows.map(cow => {
                if (cow.id !== id) {
                    return cow
                } else {
                    return {
                        ...cow,
                        ...body
                    }
                }
            })
            fs.writeFile(dbUri, JSON.stringify({ ...data, cows: newCows }), 'utf8', (err) => {
                if (err) throw err
            })
            resolve(newCows.find(cow => cow.id === id))
        } catch (error) {
            console.log('S error: ', error)
            reject(createError.InternalServerError())
        }
    })
}

exports.deleteCow = (id) => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { cows } = data
            const filteredCows = cows.filter(cow => cow.id !== id)
            fs.writeFile(dbUri, JSON.stringify({ ...data, cows: filteredCows }), 'utf8', (err) => {
                if (err) throw err
            })
            resolve()
        } catch (error) {
            console.log('S error: ', error)
            reject(createError.InternalServerError())
        }
    })
}

exports.getCows = () => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { cows } = data
            resolve(cows)
        } catch (error) {
            console.log('S error: ', error)
            reject(createError.InternalServerError())
        }
    })
}
