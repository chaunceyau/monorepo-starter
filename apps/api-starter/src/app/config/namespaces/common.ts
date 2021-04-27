import { registerAs } from '@nestjs/config'

export default registerAs('common', () => ({
  NODE_ENV: process.env.NODE_ENV,
  //
  DATABASE_URL: process.env.DATABASE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
}))
