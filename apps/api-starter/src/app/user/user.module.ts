import {Module} from '@nestjs/common';
//
import {UserService} from './user.service';
import {UserResolver} from './user.resolver';
import {PrismaModule} from '../prisma/prisma.module';
import {usersDataLoaderProvider} from '../common/dataloader/users/provider';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver, usersDataLoaderProvider],
  exports: [UserService],
})
export class UserModule {}
