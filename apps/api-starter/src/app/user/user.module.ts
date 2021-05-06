import { Module } from '@nestjs/common'
//
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { PrismaModule } from '../prisma/prisma.module'
import { CaslModule } from '../casl/casl.module'

@Module({
  imports: [PrismaModule, CaslModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
