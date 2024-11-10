import { InlineKeyboard, InputFile, type Context } from 'grammy'
import path from 'path'
import { config, logger } from '../../../../libs'

const start = async (ctx: Context): Promise<void> => {
  try {
    const bannerImagePath = path.resolve(__dirname, '../../../../../assets/banner.png')

    const image = new InputFile(bannerImagePath)

    const keyboard = new InlineKeyboard().url('Open App', config.MINIAPP_URL)

    await ctx.replyWithPhoto(image, {
      caption: '🎁 Here you can buy and send gifts to your friends!',
      reply_markup: keyboard
    })
  } catch (error) {
    logger.error(error)
  }
}

export { start }
