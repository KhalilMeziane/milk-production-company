const fs = require('fs')
const path = require('path')
const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')

const dbUri = path.join(__dirname, '/../../../db', 'db.json')

exports.createExamination = async ({ addedBy, body }) => {
    const examination = {
        id: uuidv4(),
        ...body
    }
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            data.examinations.push(examination)
            fs.writeFile(dbUri, JSON.stringify({ ...data }), 'utf8', (err) => {
                if (err) throw err
            })
            return resolve(examination)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.updateExamination = async ({ id, body }) => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { examinations } = data
            const targetExamination = examinations.find(examination => examination.id === id)
            if (!targetExamination) {
                return reject(createError.NotFound())
            }
            const examinationsList = examinations.map(examination => {
                if (examination.id !== id) {
                    return examination
                } else {
                    return {
                        ...examination,
                        ...body
                    }
                }
            })
            fs.writeFile(dbUri, JSON.stringify({ ...data, examinations: examinationsList }), 'utf8', (err) => {
                if (err) throw err
            })
            return resolve(examinationsList.find(examination => examination.id === id))
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.deleteExamination = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { examinations } = data
            const targetExamination = examinations.find(examination => examination.id === id)
            if (!targetExamination) {
                return reject(createError.NotFound())
            }
            const filteredExaminations = examinations.filter(examination => examination.id !== id)
            fs.writeFile(dbUri, JSON.stringify({ ...data, examinations: filteredExaminations }), 'utf8', (err) => {
                if (err) throw err
            })
            return resolve()
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.getExaminations = async () => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { examinations } = data
            return resolve(examinations)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.getExamination = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const db = fs.readFileSync(dbUri)
            const data = JSON.parse(db)
            const { examinations } = data
            const TargetExaminations = examinations.filter(examination => examination.cowId === id)
            return resolve(TargetExaminations)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}
