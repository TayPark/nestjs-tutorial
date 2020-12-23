import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Input validation
      forbidNonWhitelisted: true, // Input validation if there're unnecessary columns
      transform: true, // auto casting
    }),
  );
  await app.listen(3000);
}
bootstrap();
