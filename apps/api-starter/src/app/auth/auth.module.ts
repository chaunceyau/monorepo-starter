import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
//
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountService } from '../account/account.service';
import { SessionSerializer } from './util/session.serializer';
import { JwtStrategy } from './util/jwt.strategy';
import { JWTSECRET } from './util/jwt.secret.temp';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      // session: false,
    }),
    JwtModule.register({
      secret: JWTSECRET,
      // secret: 'hm_randomsecret'
    }),
  ],
  providers: [AuthService, AccountService, JwtStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
