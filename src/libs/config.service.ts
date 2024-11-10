import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const configSchema = z.object({
  ENV_MODE: z.string(),
  PORT: z.string().regex(/^\d+$/).transform(Number),
  TELEGRAM_BOT_TOKEN: z.string(),
  MINIAPP_URL: z.string(),
  DOMAIN: z.string(),
  SERVER_URL: z.string()
})

export type Config = z.infer<typeof configSchema>

const config = configSchema.parse(process.env)

export { config }
