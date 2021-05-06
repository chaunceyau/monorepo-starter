import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
//
import { AccountService } from './account.service';
import { RbacAbility } from '../casl/casl-ability.factory';
import { Action, CheckPolicies } from '../casl/policy-types';
import { PoliciesGuard } from '../common/guards/policy-guard';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import {
  AuthenticatedUser,
  ResponseObjectUser,
} from '../common/decorators/user.decorator';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('hm')
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: RbacAbility) => ability.can(Action.Read, 'User'))
  fdafds() {
    return this.accountService.testFunction();
  }

  @UseGuards(AuthenticatedGuard)
  @Post('changepass')
  async changePassword(
    @Body() body: UpdatePasswordDTO,
    @AuthenticatedUser() user: ResponseObjectUser
  ) {
    return this.accountService.changePassword(
      user.id,
      body.oldPassword,
      body.newPassword
    );
  }
}
