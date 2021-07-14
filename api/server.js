const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const pause = require('connect-pause')
const path = require('path')

const server = jsonServer.create()
const router = jsonServer.router('./db.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(pause(2000))
server.use(jsonServer.defaults({ static: path.join(process.cwd(), 'ui') }))

const SECRET_KEY =
    'a4398164235264277af424baceab1c37592aa632e8d1a677530dafc2f4e9cdd7'
const expiresIn = '1h'

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}
function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) =>
        decode !== undefined ? decode : err
    )
}
function isAuthenticated({ email, password }) {
    return (
        userdb.users.findIndex(
            (user) => user.email === email && user.password === password
        ) !== -1
    )
}

server.post('/sessions', (req, res) => {
    const { email, password } = req.body
    if (isAuthenticated({ email, password }) === false) {
        const status = 401
        const message = 'E-mail ou senha inválidos'
        res.status(status).json({ status, message })
        return
    }
    const token = createToken({ email, password })
    res.status(200).json({ token, user: userdb.users[0] })
})

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    if (
        req.headers.authorization === undefined ||
        req.headers.authorization.split(' ')[0] !== 'Bearer'
    ) {
        const status = 401
        const message = 'Erro no formato de autorização'
        res.status(status).json({ status, message })
        return
    }
    try {
        let verifyTokenResult
        verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1])

        if (verifyTokenResult instanceof Error) {
            const status = 401
            const message = 'Não fornecido um token de acesso'
            res.status(status).json({ status, message })
            return
        }
        next()
    } catch (err) {
        const status = 401
        const message = 'Erro acesso_token é revogado'
        res.status(status).json({ status, message })
    }
})

server.use(router)

server.listen(5000, () => {
    console.log('Run Auth API Server')
})
