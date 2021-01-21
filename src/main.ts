import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('nestjs-tutorial')
    .setDescription('NestJS tutorial API')
    .setVersion('1.0')
    .addTag('tutorial')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.use(csurf()); // csrf 방지
  app.enableCors(); // CORS 허용
  app.use(compression()); // response 압축
  app.use(helmet()); // HTTP 헤더 방어
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 mins
      max: 100,
    }),
  );
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
