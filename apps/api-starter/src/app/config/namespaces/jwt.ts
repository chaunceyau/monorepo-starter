import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
  JWT_SIGNING_KEY: process.env.JWT_SIGNING_KEY,
}))
