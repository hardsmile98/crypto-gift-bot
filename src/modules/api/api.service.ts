import axios from 'axios'
import { config } from '../../libs'
import { type IOrder } from './api.types'

const api = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiService = {
  getOrder: async (orderId: string, telegramId: number): Promise<IOrder | null> => {
    const { data } = await api.get<IOrder | null>(`/api/bot/${config.TELEGRAM_BOT_TOKEN}/getOrder`, {
      params: {
        orderId,
        telegramId
      }
    })

    return data
  }
}

export { apiService }
