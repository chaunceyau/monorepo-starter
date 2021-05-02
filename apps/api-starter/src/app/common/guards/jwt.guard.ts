import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // constructor(private reflector: Reflector) {
  //   super();
  // }

  getRequest(context: ExecutionContext) {
    console.log('RUNNING GUARD');
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

  canActivate(context: ExecutionContext) {
    console.log('canActivate?');
    return super.canActivate(context);
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
