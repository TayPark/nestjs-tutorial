import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // to make same as production application
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Input validation
        forbidNonWhitelisted: true, // Input validation if there're unnecessary columns
        transform: true, // auto casting
      }),
    );
    await app.init();
  });

  describe('/ (health check)', () => {
    it('GET | 200 ', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Server is alive!');
    });
  });

  describe('/users', () => {
    it('GET | 200', () => {
      return request(app.getHttpServer()).get('/users').expect(200).expect([]);
    });

    it('POST | 200', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ age: 5, name: 'Asly' })
        .expect(201);
    });

    it('POST | 400', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({ message: 'Unnecessary message here' })
        .expect(400);
    });
  });

  describe('/users/:id', () => {
    it('GET | 200', () => {
      return request(app.getHttpServer()).get('/users/0').expect(200);
    });

    it('GET | 404', () => {
      return request(app.getHttpServer()).get('/users/9999').expect(404);
    });

    it('PATCH | 200', () => {
      return request(app.getHttpServer())
        .patch('/users/0')
        .send({ age: 10 })
        .expect(200);
    });

    it('DELETE | 200', () => {
      return request(app.getHttpServer()).delete('/users/0').expect(200);
    });
  });
});
