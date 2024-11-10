import { type Request, type Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { logger } from '../../libs'
import { botApiService } from './botApi.service'
import { type OrderNotification, type GetAvatar } from './botApi.schema'

const botApiController = {
  getAvatar: async (
    req: Request<unknown, unknown, GetAvatar>,
    res: Response) => {
    try {
      const telegramId = req.body.telegramId

      const avatar = await botApiService.getAvatar(telegramId)

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: avatar
      })
    } catch (error) {
      logger.error(error)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      })
    }
  },

  orderNotification: async (
    req: Request<unknown, unknown, OrderNotification>,
    res: Response) => {
    try {
      await botApiService.sendOrderNotification(req.body)

      res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: true
      })
    } catch (error) {
      logger.error(error)

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR
      })
    }
  }
}

export { botApiController }
