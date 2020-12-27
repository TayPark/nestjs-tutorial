import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS 허용
  app.use(csurf()); // csrf 방지
  app.use(compression()); // response 압축
  app.use(helmet());  // HTTP 헤더 방어
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
