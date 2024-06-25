import { ConfigType } from '@nestjs/config';
import config from './config';
export declare class AppService {
    private task;
    private configService;
    constructor(task: any[], configService: ConfigType<typeof config>);
    getHello(): string;
    getHello2(limit: any): string;
}
