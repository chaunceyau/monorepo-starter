import {Injectable, NotFoundException} from '@nestjs/common';
import {User} from '@prisma/client';
//
import {PrismaService} from '../../prisma/prisma.service';
import {BaseDataSource} from '../../user/base';

@Injectable()
export class UserRepository extends BaseDataSource {
  constructor(private prisma: PrismaService) {
    super();
  }

  async findUniqueById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: {id},
    });
    if (!user) throw new NotFoundException();
    // const {password, salt, ...result} = user;
    return user;
  }
}
