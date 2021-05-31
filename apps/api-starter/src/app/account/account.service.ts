import * as cuid from 'cuid';
// import { Stripe } from 'stripe';
import { genSalt, hash } from 'bcrypt';
// import { InjectStripe } from 'nestjs-stripe';
import { SubscriptionType } from '@prisma/client';
import { Injectable, BadRequestException } from '@nestjs/common';
//
import { PrismaService } from '../prisma/prisma.service';
import { UserGraphModel } from '../user/models/user.model';
import { UpdatePasswordFailed } from './models/update-password.input';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService // @InjectStripe() private readonly stripeClient: Stripe
  ) {}

  async createAccount(
    email: string,
    password: string
  ): Promise<UserGraphModel> {
    if (!email || !password)
      throw new Error('You must provide email & password');

    // const stripe_user = await this.stripeClient.customers.create({
    //   email: email,
    // })

    // if (!stripe_user) {
    //   throw new InternalServerErrorException(
    //     'Failed creating account during stripe linking.'
    //   )
    // }

    const { salt, password: hashedPassword } = await this.hashPassword(
      password
    );
    try {
      const {
        password,
        salt: _salt,
        ...result
      } = await this.prisma.user.create({
        data: {
          id: cuid(),
          salt,
          email,
          password: hashedPassword,
          // stripe_customer_id: stripe_user.id,
        },
      });
      return result;
    } catch (err) {
      throw new BadRequestException(
        'Failed creating account, account already exists.'
      );
    }
  }

  async changePassword(
    id: string,
    originalPassword: string,
    newPassword: string
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      const { password: hashedOriginalPassword } = await this.hashPassword(
        originalPassword,
        user.salt
      );

      if (hashedOriginalPassword !== user.password) {
        return new UpdatePasswordFailed('Passwords did not match.');
      }

      const {
        password: hashedNewPassword,
        salt: newSalt,
      } = await this.hashPassword(newPassword);

      await this.prisma.user.update({
        where: { id },
        data: {
          password: hashedNewPassword,
          salt: newSalt,
        },
      });
    } catch (err) {
      throw new BadRequestException('Failed changing password.');
    }
  }

  async hashPassword(
    password: string,
    salt?: string
  ): Promise<{
    password: string;
    salt: string;
  }> {
    if (salt) {
      const hashedPassword = await hash(password, salt);
      return { salt, password: hashedPassword };
    } else {
      const generatedSalt = await genSalt(10);
      const hashedPassword = await hash(password, generatedSalt);
      return { salt: generatedSalt, password: hashedPassword };
    }
  }
}
