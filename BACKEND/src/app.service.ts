import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
@Injectable()
export class AppService {
  constructor(
    //private configService: ConfigService,
    //@Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private task: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getHello() {
    console.log(this.task);
    return `Hello World! , ${this.configService.apiKey}|||
     ${this.configService.database.host}||| ${this.configService.database.port}`;
  }

  getHello2(limit): string {
    return `Hello Wor!, ${limit}`;
  }
}
