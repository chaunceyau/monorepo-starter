import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private reflector: Reflector) {
  //   super();
  // }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // getRequest(context: ExecutionContext) {
  //   if (context.getType() === 'http') {
  //     return context.switchToHttp().getRequest();
  //   } else if (context.getType<GqlContextType>() === 'graphql') {
  //     const ctx = GqlExecutionContext.create(context);
  //     return ctx.getContext().req;
  //   }
  // }

  async canActivate(context: ExecutionContext) {
    console.log('canActivate?');
    const can = await super.canActivate(context);
    if (can) {
      console.log('1');
      const ctx = GqlExecutionContext.create(context);
      console.log(ctx.getContext().req.user);
      await super.logIn(ctx.getContext().req);
    }
    console.log('2');
    return true;
  }
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
