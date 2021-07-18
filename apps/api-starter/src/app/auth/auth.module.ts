import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
//
import {UserModule} from '../user/user.module';
import {JwtStrategy} from './util/jwt.strategy';
import {PrismaModule} from '../prisma/prisma.module';
import {LocalConfigModule} from '../config/config.module';
import {SessionSerializer} from './util/session.serializer';
import {JwtConfigService} from '../config/services/jwt.config';

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
  providers: [JwtStrategy, SessionSerializer],
})
export class AuthModule {}
