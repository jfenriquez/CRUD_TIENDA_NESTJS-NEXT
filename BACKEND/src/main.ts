import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  VersioningType,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  ); // new
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  ////versioning
  app.setGlobalPrefix('v1');
  ////swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('APIDESCRIP')
    .setVersion('1.0')
    .addTag('API TAG')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  await app.listen(3001);
}
bootstrap();
