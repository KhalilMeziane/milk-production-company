const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const dbUri = path.join(__dirname, 'db.json')

const MockupData = {
    users: [
        {
            id: uuidv4(),
            fullName: 'admin',
            email: 'admin@gmail.com',
            role: 'admin',
            password: '$argon2id$v=19$m=65536,t=3,p=4$NI1KbhIP0IL4tWAqOQmeOg$Gn3RVAm8q1lOKc0QZEDEZ8f7QPDBI655V2k+N7bTJ9c'
        }
    ],
    cows: [],
    milks: [],
    examinations: []
}

exports.readData = () => {
    try {
        if (!fs.existsSync(dbUri)) {
            fs.mkdirSync(dbUri)
            fs.writeFile(dbUri, JSON.stringify(MockupData), 'utf8', (error) => {
                if (error) throw error
            })
        }
        const db = fs.readFileSync(dbUri)
        const { users, cows, milks, examinations } = JSON.parse(db)
        return { users, cows, milks, examinations }
    } catch (error) {
        console.log('Read Data error: ', error)
        throw error
    }
}

exports.saveData = (data) => {
    try {
        fs.writeFile(dbUri, JSON.stringify(data), 'utf8', (error) => {
            if (error) throw error
        })
        return {}
    } catch (error) {
        console.log('Save Data error: ', error)
        throw error
    }
}
