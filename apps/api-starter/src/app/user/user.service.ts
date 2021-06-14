import {Injectable, NotFoundException} from '@nestjs/common';
import {
  findManyCursorConnection,
  ConnectionArguments,
} from '@devoxa/prisma-relay-cursor-connection';
//
import {UserGraphModel} from './models/user.model';
import {PrismaService} from '../prisma/prisma.service';
import {getPaginationArgs} from '../common/pagination';
@Injectable()
export class UserService  {
  constructor(private prisma: PrismaService) {}

  async findAllConnection(input?: ConnectionArguments) {
    const pagination = getPaginationArgs(input);
    // TODO: make sure cursor exists..
    // TODO: add dataloader..
    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        ...pagination,
      }),
      this.prisma.user.count(),
    ]);

    return await findManyCursorConnection(
      async () => users,
      async () => count,
      input
    );
  }

  // potentially dangerous - shows existence of an account...
  async findByEmail(email: string): Promise<UserGraphModel | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {email},
    });
    if (!user) throw new NotFoundException();
    const {password, salt, ...result} = user;
    return result;
  }

  async findUniqueById(id: string): Promise<UserGraphModel | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {id},
    });
    if (!user) throw new NotFoundException();
    const {password, salt, ...result} = user;
    return result;
  }
}
