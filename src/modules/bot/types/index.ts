import { type Context, type SessionFlavor } from 'grammy'

type MyContext = Context & SessionFlavor<object>

export type { MyContext }
