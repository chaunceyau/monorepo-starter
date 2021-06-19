import {Provider, Scope} from '@nestjs/common';
//
import {PrismaService} from 'apps/api-starter/src/app/prisma/prisma.service';
//
import {NotificationsDataLoader} from './loader';

export const notificationsDataLoaderProvider: Provider = {
  inject: [PrismaService],
  useFactory: NotificationsDataLoader.create,
  provide: NotificationsDataLoader,
  scope: Scope.REQUEST,
};
