import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
export declare class ApiKeyGuard implements CanActivate {
    private reflector;
    private configService;
    constructor(reflector: Reflector, configService: ConfigType<typeof config>);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
