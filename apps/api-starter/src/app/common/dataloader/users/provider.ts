import { Provider, Scope } from '@nestjs/common';
//
import { PrismaService } from 'apps/api-starter/src/app/prisma/prisma.service';
//
import { UsersDataLoader } from './loader';

export const usersDataLoaderProvider: Provider = {
  inject: [PrismaService],
  useFactory: UsersDataLoader.create,
  provide: UsersDataLoader,
  scope: Scope.REQUEST,
};
