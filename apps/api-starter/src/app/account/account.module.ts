import { Module } from '@nestjs/common'
// 
import { AccountController } from './account.controller'
import { AccountService } from './account.service'
import { PrismaModule } from '../prisma/prisma.module'
import { UserService } from '../user/user.service'
import { CaslModule } from '../casl/casl.module'

@Module({
  imports: [PrismaModule, CaslModule],
  providers: [AccountService, UserService],
  controllers: [AccountController],
})
export class AccountModule {}
