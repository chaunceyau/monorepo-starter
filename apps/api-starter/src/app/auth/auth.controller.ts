import {
  Get,
  Req,
  Post,
  Body,
  Request,
  UseGuards,
  Controller,
} from '@nestjs/common';
//
import { User } from '../user/models/user.model';
import { UserService } from '../user/user.service';
import { LoginGuard } from '../common/guards/login.guard';
import { AccountService } from '../account/account.service';
import { CreateAccountDTO } from '../account/dto/create-account.dto';
import { AuthenticatedGuard } from '../common/guards/authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private accountService: AccountService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('whoami')
  async whoami(@Request() req) {
    return await this.userService.findUniqueById(req.user.id);
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login(@Req() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() { email, password }: CreateAccountDTO): Promise<User> {
    return await this.accountService.createAccount(email, password);
  }

  @Post('logout')
  logout(@Request() req) {
    req.logout();
  }
}
