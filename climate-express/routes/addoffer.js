import express from 'express'
import TelegramBot from 'node-telegram-bot-api'
import fs from 'fs'

const token = process.env.TELEGRAMTOKEN
const bot = new TelegramBot(token, { polling: true })

const router = express.Router()
router.use(express.json({ limit: '50mb' }))
router.use(express.urlencoded({ extended: true }))

router.post('/api/addoffer', (req, res, next) => {
    const { base64, type, filename, user = {} } = req.body
    const chatId = user?.id
    console.log({ type, filename, user })

    fs.writeFile(filename, base64, { encoding: 'base64' }, (err) => {
        if (err) {
            return next(err)
        }

        const stream = fs.createReadStream(filename)
        bot.sendDocument(chatId, stream, {}, { contentType: 'application/pdf' })

        return res.send(JSON.stringify({ status: 'Ok' }))
    })
})

export default router