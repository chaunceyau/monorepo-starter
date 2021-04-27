import { Injectable, UnauthorizedException } from '@nestjs/common';
//
import { PrismaService } from '../prisma/prisma.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private accountService: AccountService
  ) {}

  /**
   *
   * @param email user's email address
   * @param rawPassword provided plaintext/unhashed password
   */
  async validateUser(email: string, rawPassword: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    
    if (!user) throw new UnauthorizedException();

    const { password, salt, ...result } = user;
    const { password: hashedPassword } = await this.accountService.hashPassword(
      rawPassword,
      salt
    );

    return password === hashedPassword ? result : null;
  }
}
