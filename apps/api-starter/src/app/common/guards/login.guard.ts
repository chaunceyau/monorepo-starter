import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { LOCAL_STRATEGY_NAME } from '../../auth/util/local.strategy';

@Injectable()
export class LoginGuard
  extends AuthGuard(LOCAL_STRATEGY_NAME)
  implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
