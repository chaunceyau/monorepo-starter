import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
//
import { User } from '../user/models/user.model';
import { AccountService } from './account.service';
import { PoliciesGuard } from '../casl/policy-guard';
import { RbacAbility } from '../casl/casl-ability.factory';
import { Action, CheckPolicies } from '../casl/policy-types';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import {
  RESTUser,
  ResponseObjectUser,
} from '../common/decorators/user.decorator';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('hm')
  @UseGuards(PoliciesGuard)
  // note - can't pass more here
  @CheckPolicies((ability: RbacAbility) => ability.can(Action.Read, User))
  fdafds() {
    return 'fldmsalfmd';
  }

  @UseGuards(AuthenticatedGuard)
  @Post('changepass')
  async changePassword(
    @Body() body: UpdatePasswordDTO,
    @RESTUser() user: ResponseObjectUser
  ) {
    return this.accountService.changePassword(
      user.id,
      body.oldPassword,
      body.newPassword
    );
  }
}
