import { Strategy } from 'passport-jwt';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//
import { PrismaService } from '../../prisma/prisma.service';
import { JwtConfigService } from '../../config/services/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly prismaService: PrismaService
  ) {
    super({
      secretOrKey: jwtConfigService.jwtSigningKey,
      jwtFromRequest: function (req) {
        let token = null;
        if (req && req.cookies) {
          token = req.cookies['next-auth.session-token'];
        }
        return token;
      },
    });
  }

  async validate(payload: SignedJwtPayload) {
    return await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });
  }
}

interface SignedJwtPayload {
  name: string;
  email: string;
  sub: string;
  iat: number;
}
