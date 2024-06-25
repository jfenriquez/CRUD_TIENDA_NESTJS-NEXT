import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'; ////contexto para saber metadata

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.models';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} ///inyectamos reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler()); ///obtenemos metadata
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('request.user:', request.user);
    const user = request.user as PayloadToken;
    console.log('user:', user);
    const isAuth = roles.some((role) => role === user.role);

    if (!isAuth) {
      throw new UnauthorizedException('No tienes permisos' + roles + user.role);
    }

    return isAuth;
  }
}
