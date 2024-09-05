import http from 'node:http'
import { bodyParser } from './middlewares/body-parser.js'
const server = http.createServer((req, res) => {
    bodyParser(req, res)
    res.end('Hello World')
});
const PORT = 3000
server.listen(PORT, () => console.log(`Server is Running on port ${PORT}`))
