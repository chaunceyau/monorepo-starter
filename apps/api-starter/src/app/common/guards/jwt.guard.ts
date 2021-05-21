import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // async canActivate(context: ExecutionContext) {
  //   this.logger.debug(`Checking if current user canActive()`)
  //   // const can = await super.canActivate(context);
  //   // if (can) {
  //   if (context.getType() === 'http') {
  //     this.logger.debug(`normal http request...`)
  //     await super.logIn(context.switchToHttp().getRequest());
  //   } else if (context.getType<GqlContextType>() === 'graphql') {
  //     this.logger.debug(`graphql request...`)
  //     const ctx = GqlExecutionContext.create(context);
  //     // @ts-ignore
  //     this.logger.debug(ctx);
  //     // @ts-ignore
  //     await super.logIn(ctx);
  //     this.logger.debug(ctx.switchToHttp().getRequest());
  //   }
  //   return true;
  // }
  //   const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (isPublic) {
  //     return true;
  //   }

  //   console.log({ context: });

  //   return super.canActivate(context);
  // }
}
