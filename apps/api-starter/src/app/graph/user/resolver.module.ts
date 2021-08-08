import {Module} from '@nestjs/common';

import {RepositoryModule} from '../../data/module';
import {UserFieldResolver} from './field.resolver';
import {UserMutationResolver} from './mutation.resolver';
import {UserQueryResolver} from './query.resolver';

@Module({
  imports: [RepositoryModule],
  providers: [UserFieldResolver, UserMutationResolver, UserQueryResolver],
})
export class UserResolversModule {}
