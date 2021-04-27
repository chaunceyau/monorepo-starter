import { registerAs } from '@nestjs/config'

export default registerAs('cookies', () => ({
  COOKIE_SIGNING_SECRET: process.env.COOKIE_SIGNING_SECRET,
  COOKIE_MAX_AGE: 1000 * 60 * 60 * 30 * 24,
}))
