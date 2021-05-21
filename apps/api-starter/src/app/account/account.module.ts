import { Module } from '@nestjs/common';
//
import { AccountService } from './account.service';
import { UserService } from '../user/user.service';
import { AccountResolver } from './account.resolvers';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccountService, AccountResolver, UserService],
})
export class AccountModule {}
