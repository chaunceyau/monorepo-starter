import { Module } from '@nestjs/common'
//
import { UserService } from './user.service'
import { UserResolver } from './user.resolver'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
