
import { bot } from '../bot'
import { type OrderNotification } from './botApi.schema'
import { InlineKeyboard } from 'grammy'
import { config } from '../../libs'

const botApiService = {
  getAvatar: async (telegramId: number) => {
    try {
      const response = await bot.api.getUserProfilePhotos(telegramId)

      const photos = response.photos

      if (photos === undefined || photos?.length === 0) {
        return ''
      }

      const fileId = photos[0]?.[0]?.file_id

      const fileResponse = await bot.api.getFile(fileId)

      const filePath = fileResponse.file_path

      if (filePath === undefined) {
        return ''
      }

      const avatarUrl = `https://api.telegram.org/file/bot${bot.token}/${filePath}`

      return avatarUrl
    } catch (error) {
      return ''
    }
  },

  sendOrderNotification: async (data: OrderNotification) => {
    let message: string
    let buttonText: string

    switch (data.action) {
      case 'purchase': {
        message = `✅ You have purchased the gift of <b>${data.orderDetail.gift}</b>`
        buttonText = 'Open Gifts'

        break
      }

      case 'receive': {
        message = `⚡️ <b>${data.orderDetail.from?.firstName ?? ''}</b> has given you the gift of <b>${data.orderDetail.gift}</b>`
        buttonText = 'View Gift'

        break
      }

      case 'send': {
        message = `👌 <b>${data.orderDetail.to?.firstName ?? ''}</b> received your gift of <b>${data.orderDetail.gift}</b>`
        buttonText = 'Open App'

        break
      }
    }

    const keyboard = new InlineKeyboard().url(buttonText, config.MINIAPP_URL)

    await bot.api.sendMessage(data.telegramId, message, { parse_mode: 'HTML', reply_markup: keyboard })
  }
}

export { botApiService }
