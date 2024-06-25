import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductosModule } from './productos/productos.module';
import { UsersModule } from './users/users.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';
import * as Joi from 'joi';
//import { MulterModule } from '@nestjs/platform-express/multer';
import { ImagesModule } from './images/images.module';
import { PaymentController } from './payment/payment.controller';

import { PaymentService } from './payment/payment.service';
@Module({
  imports: [
    HttpModule,
    ProductosModule,
    UsersModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
      }), ///JOI
    }),
    AuthModule,
    ImagesModule,
  ],
  controllers: [AppController, PaymentController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: config().apiKey,
    },
    {
      provide: 'TASKS',
      useFactory: async (httpService: HttpService) => {
        const tasks = await httpService
          .get('http://jsonplaceholder.typicode.com/todos')
          .toPromise();

        return JSON.stringify(tasks.data);
      },
      inject: [HttpService],
    },
    PaymentService,
  ],
  //exports: [AppService]
})
export class AppModule {}
