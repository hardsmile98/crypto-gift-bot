import { Bot, session } from 'grammy'
import { start, sendGift } from './handlers'
import { type MyContext } from './types'
import { config } from '../../libs'

const token = config.TELEGRAM_BOT_TOKEN

export const bot = new Bot<MyContext>(token)

bot.use(session({
  initial () {
    return {}
  }
}))

void bot.api.setMyCommands([
  { command: 'start', description: 'Start app' }
])

bot.command('start', start)
bot.on('inline_query', sendGift)

bot.use(async (ctx) => {
  await ctx.reply('❗️ This command does not exist')
})
