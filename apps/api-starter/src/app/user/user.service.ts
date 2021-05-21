import { Injectable, NotFoundException } from '@nestjs/common';
import {
  findManyCursorConnection,
  ConnectionArguments,
} from '@devoxa/prisma-relay-cursor-connection';
//
import { UserGraphModel } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAllConnection(where?: ConnectionArguments) {
    const users = await this.prisma.user.findMany({
      // TODO: test this...
      where: where as Prisma.UserWhereInput,
    });
    return await findManyCursorConnection(
      async () => users,
      async () => users.length,
      where
    );
  }

  // potentially dangerous - shows existence of an account...
  async findByEmail(email: string): Promise<UserGraphModel | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException();
    const { password, salt, ...result } = user;
    return result;
  }

  async findUniqueById(id: string): Promise<UserGraphModel | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    const { password, salt, ...result } = user;
    return result;
  }
}
