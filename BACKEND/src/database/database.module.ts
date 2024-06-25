import { Global, Module } from '@nestjs/common';
//import { Client } from 'pg';

import config from '../config';

import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { User, dbPassword, dbHost, dbName, dbPort } =
          configService.postgres;
        return {
          type: 'postgres', // type of our database
          username: User,
          host: dbHost,
          database: dbName,
          password: dbPassword,
          port: dbPort,
          synchronize: true, // turn to true when we are in development mode
          autoLoadEntities: true, // allow to load entities automatically
        };
      },
    }),
  ],
  providers: [],
  exports: [TypeOrmModule], ///exportamos conexion a la base de datos
})
export class DatabaseModule {}
