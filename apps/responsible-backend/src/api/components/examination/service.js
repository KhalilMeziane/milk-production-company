const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid')
const { readData, saveData } = require('../../../db/db')

exports.createExamination = async ({ addedBy, body }) => {
    const examination = {
        id: uuidv4(),
        ...body
    }
    return new Promise((resolve, reject) => {
        try {
            const { examinations, ...data } = readData()
            examinations.push(examination)
            saveData({ ...data, examinations })
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
            const { examinations, ...data } = readData()
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
            saveData({ ...data, examinations: examinationsList })
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
            const { examinations, ...data } = readData()
            const targetExamination = examinations.find(examination => examination.id === id)
            if (!targetExamination) {
                return reject(createError.NotFound())
            }
            const filteredExaminations = examinations.filter(examination => examination.id !== id)
            saveData({ ...data, examinations: filteredExaminations })
            return resolve()
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}

exports.getExamination = async (id) => {
    return new Promise((resolve, reject) => {
        try {
            const { examinations } = readData()
            const TargetExaminations = examinations.filter(examination => examination.cowId === id)
            return resolve(TargetExaminations)
        } catch (error) {
            console.log('S error: ', error)
            return reject(createError.InternalServerError())
        }
    })
}
