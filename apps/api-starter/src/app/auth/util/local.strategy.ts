import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
//
import { AuthService } from '../auth.service'

export const LOCAL_STRATEGY_NAME = 'local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL_STRATEGY_NAME) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password'
    })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
