import { ConfigType } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import config from '../../config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(configService: ConfigType<typeof config>);
    validate(payload: any): Promise<{
        id: any;
        role: any;
        email: any;
    }>;
}
export {};
