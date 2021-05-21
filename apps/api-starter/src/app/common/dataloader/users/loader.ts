import { User } from '@prisma/client';
import * as DataLoader from 'dataloader';
// import { Injectable } from '@nestjs/common';
import { DataLoader as IDataLoader } from '../../types';
import { PrismaService } from '../../../prisma/prisma.service';

// @Injectable()
export class UsersDataLoader implements IDataLoader<string, User> {
  constructor(private readonly dataLoader: DataLoader<string, User>) {}

  public static async create(prisma: PrismaService): Promise<UsersDataLoader> {
    const dataLoader = new DataLoader<string, User>(async keys => {
      const loadedEntities = await prisma.user.findMany({
        where: { id: { in: [...keys] } },
      });
      return keys.map(key => loadedEntities.find(entity => entity.id === key)); // sort by keys
    });

    return new UsersDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}
