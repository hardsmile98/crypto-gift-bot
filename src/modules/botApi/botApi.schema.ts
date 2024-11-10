import { z } from 'zod'

export const getAvatarSchema = z.object({
  body: z.object({
    telegramId: z.number({
      message: 'telegramId is required'
    })
  })
})

export const orderNotificationSchema = z.object({
  body: z.object({
    telegramId: z.number({
      message: 'telegramId is required'
    }),
    action: z.enum(['purchase', 'send', 'receive']),
    orderDetail: z.object({
      to: z.object({
        firstName: z.string().optional()
      }).optional(),
      from: z.object({
        firstName: z.string().optional()
      }).optional(),
      gift: z.string({ message: 'gift is required' })
    })
  })
})

export type GetAvatar = z.infer<typeof getAvatarSchema>['body']
export type OrderNotification = z.infer<typeof orderNotificationSchema>['body']
