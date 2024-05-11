// подключение express
import express from 'express'
import AddOffer from './routes/addoffer.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// const key = fs.readFileSync(__dirname + '/selfsigned.key')
// const cert = fs.readFileSync(__dirname + '/selfsigned.crt')
// const options = { key, cert: cert }

// создаем объект приложения
const app = express()

// Указываем путь к фронту
const assetsPath = __dirname + '/view/'

app.use(AddOffer)
app.use(express.static(assetsPath))

app.get('/', (request, response) => {
    response.sendFile(assetsPath + 'index.html')
})

// начинаем прослушивать подключения на порту
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Сервер запущен по адресу: http://localhost:${port}`)
})