const HTTP = require('http')
const chalk = require('chalk')
const app = require('./api/app')
const PORT = normalizePort(process.env.PORT || 3000)

app.set('port', PORT)

const server = HTTP.createServer(app)

server.listen(PORT, () => {
    console.log(`host: ${chalk.bgBlue(`http://localhost:${PORT}`)}`)
})

function normalizePort (value) {
    const port = parseInt(value, 10)
    if (isNaN(port)) {
        return value
    }
    if (port >= 0) {
        return port
    }
    return false
}
