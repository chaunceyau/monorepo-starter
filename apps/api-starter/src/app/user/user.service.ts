import { Injectable, NotFoundException } from '@nestjs/common';
//
import { User } from './models/user.model';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // potentially dangerous - shows existence of an account...
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException();
    const { password, salt, ...result } = user;
    return result;
  }

  async findUniqueById(id: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) throw new NotFoundException();
    const { password, salt, ...result } = user;
    return result;
  }
}
