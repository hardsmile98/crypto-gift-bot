import { Router } from 'express'
import { botApiController } from './botApi.controller'
import { getAvatarSchema, orderNotificationSchema } from './botApi.schema'
import { validateRequest } from '../../middlewares'

const botApiRouter = Router()

botApiRouter.post('/getAvatar', validateRequest(getAvatarSchema), botApiController.getAvatar)

botApiRouter.post('/notification', validateRequest(orderNotificationSchema), botApiController.orderNotification)

export { botApiRouter }
