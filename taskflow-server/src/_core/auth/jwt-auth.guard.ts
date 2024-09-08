import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (
      request &&
      request.query['authorization'] &&
      !request.header('authorization')
    ) {
      (request.headers['authorization'] as any) =
        request.query['authorization'];
    }
    return super.canActivate(context);
  }
}
