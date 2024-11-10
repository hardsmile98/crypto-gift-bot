import axios from 'axios'
import { config, logger } from '../../libs'
import { type IOrder } from './api.types'

const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiService = {
  getOrder: async (orderId: string, telegramId: number): Promise<IOrder | null> => {
    try {
      const response = await api.get<{ data: IOrder | null }>(`/api/bot/${config.TELEGRAM_BOT_TOKEN}/getOrder`, {
        params: {
          orderId,
          telegramId
        }
      })

      return response?.data?.data
    } catch (error) {
      logger.error(error)

      return null
    }
  }
}

export { apiService }
