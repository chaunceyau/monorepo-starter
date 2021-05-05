import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtConfigService } from '../../config/services/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtConfigService: JwtConfigService) {
    super({
      secretOrKey: jwtConfigService.jwtSigningKey,
      ignoreExpiration: true,
      jwtFromRequest: function (req) {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['next-auth.session-token'];
        }
        return token;
      },
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy: VALIDATING JWT');
    return { name: payload.name, email: payload.email };
  }
}
