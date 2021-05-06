import {
  UseGuards,
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { genSalt, hash } from 'bcrypt';
import { Stripe } from 'stripe';
import * as cuid from 'cuid';
import { SubscriptionType } from '@prisma/client';
//
import { PrismaService } from '../prisma/prisma.service';
import { UserGraphModel } from '../user/models/user.model';

@Injectable()
export class AccountService {
  constructor(
    private prisma: PrismaService,
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}
  
  // @UseGuards(PoliciesGuard)
  // @CheckPolicies((ability: RbacAbility) => ability.can(Action.Read, 'User'))
  testFunction() {
    return 'fldmsalfmd'
  }

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
          subscription_type: SubscriptionType.FREE_TIER,
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
      if (hashedOriginalPassword !== user.password)
        throw new UnauthorizedException('Original password incorrect.');
      //
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
