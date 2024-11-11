import express from 'express'
import { webhookCallback } from 'grammy'
import { bot, botApiRouter } from '@/modules'
import { config } from '@/libs'

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
    app.use(`/bot/webhook/${token}`, webhookCallback(bot, 'express'))

    await bot.api.setWebhook(`https://${domain}/bot/webhook/${token}`)

    console.log(`Bot Launched on https://${domain} domain`)
  }
}

void runBot()

app.use(`/bot/api/${token}`, botApiRouter)

app.listen(port, () => {
  console.log(`Server Launched on ${port} port`)
})
