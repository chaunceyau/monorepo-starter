import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWTSECRET } from './jwt.secret.temp';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // secretOrKey: JSON.stringify({
      //   kty: 'oct',
      //   kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
      //   alg: 'HS512',
      //   // k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
      // }),
      secretOrKey: JWTSECRET,
      // remove me
      ignoreExpiration: true,
      jwtFromRequest: function (req) {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['next-auth.session-token'];
        }
        console.log('JwtStrategy: GETTING JWT FROM REQUEST - ' + token);
        return token;
        // return token;
      },
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy: VALIDATING JWT');
    return { name: payload.name, email: payload.email };
  }
}
