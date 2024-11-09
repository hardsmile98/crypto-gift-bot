import { type Context } from 'grammy'

const start = async (ctx: Context): Promise<void> => {
  console.log(ctx)

  await ctx.reply('Welcome!')
}

export { start }
