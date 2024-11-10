import express from 'express'
import { webhookCallback } from 'grammy'
import { bot, botApiRouter } from './modules'
import crypto from 'node:crypto'
import { config } from './libs'

const secretToken = crypto.randomBytes(64).toString('hex')

const token = config.TELEGRAM_BOT_TOKEN
const port = config.PORT
const domain = config.DOMAIN

const isDev = config.ENV_MODE === 'dev'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const runBot = async (): Promise<void> => {
  await bot.api.deleteWebhook()

  if (isDev) {
    await bot.start()
  } else {
    app.use(`/bot/webhook/${token}`, webhookCallback(bot, 'express', {
      secretToken
    }))

    await bot.api.setWebhook(`https://${domain}/bot/webhook/${token}`)

    console.log(`Bot Launched on https://${domain} domain`)
  }
}

void runBot()

app.use('/bot/api', botApiRouter)

app.listen(port, () => {
  console.log(`Server Launched on ${port} port`)
})
