import {UserNotification} from '@prisma/client';
import * as DataLoader from 'dataloader';
// import { Injectable } from '@nestjs/common';
import {DataLoader as IDataLoader} from '../../types';
import {PrismaService} from '../../../prisma/prisma.service';

// @Injectable()
export class NotificationsDataLoader
  implements IDataLoader<string, UserNotification> {
  constructor(
    private readonly dataLoader: DataLoader<string, UserNotification>
  ) {}

  public static async create(
    prisma: PrismaService
  ): Promise<NotificationsDataLoader> {
    const dataLoader = new DataLoader<string, UserNotification>(async keys => {
      const loadedEntities = await prisma.userNotification.findMany({
        where: {id: {in: [...keys]}},
      });
      return keys.map(key => loadedEntities.find(entity => entity.id === key)); // sort by keys
    });

    return new NotificationsDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}
