import { InlineKeyboard, type Context } from 'grammy'
import { type InlineQueryResultArticle } from 'grammy/types'
import { config, logger } from '../../../../libs'
import { apiService } from '../../../api'

const sendGift = async (ctx: Context): Promise<void> => {
  try {
    const inlineQuery = ctx.update.inline_query

    const pattern = /^gift_[a-f0-9]{24}$/

    if (inlineQuery !== undefined && pattern.test(inlineQuery.query)) {
      const query = inlineQuery.query

      const [, id] = query.split('_')

      const order = await apiService.getOrder(id, inlineQuery.from.id)

      if (order === null) {
        await ctx.answerInlineQuery([])

        return
      }

      const keyboard = new InlineKeyboard().url(
        'Receive Gift',
        `${config.MINIAPP_URL}?startapp=receive_${order.id}_${order.hash}`
      )

      const results: InlineQueryResultArticle[] = [
        {
          type: 'article',
          id: order.id,
          title: 'Send Gift',
          description: `Send a gift of ${order.gift}`,
          input_message_content: {
            parse_mode: 'HTML',
            message_text: '🎁 I have a <b>gift</b> for you! Tap the button below to open it.'
          },
          reply_markup: keyboard
        }
      ]

      await ctx.answerInlineQuery(results)
    } else {
      await ctx.answerInlineQuery([])
    }
  } catch (error) {
    logger.error(error)
  }
}

export { sendGift }
