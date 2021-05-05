import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
//
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AccountService } from '../account/account.service';
import { SessionSerializer } from './util/session.serializer';
import { JwtStrategy } from './util/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: JSON.stringify({
        kty: 'oct',
        kid: 'X-yjrKBannu7fp7LYP3pEDHnF5enDayamaFGVTxMf3M',
        alg: 'HS512',
        k: 'Z3DVSmbLvMCXeVcHQZcnBs4jERm7Ym8YpBpGNcNY62c',
      }),
    }),
  ],
  providers: [AuthService, AccountService, JwtStrategy, SessionSerializer],
})
export class AuthModule {}
