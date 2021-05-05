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
import { JwtConfigService } from '../config/services/jwt.config';
import { LocalConfigModule } from '../config/config.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    LocalConfigModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      useFactory: (jwtConfig: JwtConfigService) => ({
        secret: jwtConfig.jwtSigningKey,
      }),
      imports: [LocalConfigModule],
      inject: [JwtConfigService],
    }),
  ],
  providers: [AuthService, AccountService, JwtStrategy, SessionSerializer],
})
export class AuthModule {}
