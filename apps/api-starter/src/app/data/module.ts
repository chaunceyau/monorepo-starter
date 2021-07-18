import {Module} from '@nestjs/common';
import {PrismaModule} from '../prisma/prisma.module';
import {UserRepository} from './repos/user.repository';

@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class RepositoryModule {}
