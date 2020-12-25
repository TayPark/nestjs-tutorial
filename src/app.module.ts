import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostService } from './posts/posts.service';
import { PostController } from './posts/posts.controller';
import { PrismaService } from './prisma.service';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { logger } from './common/middlewares/logger.middleware';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, PostsModule, AuthModule],
  controllers: [AppController, PostController],
  providers: [AppService, PostService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /* 부분적 허용 */
    consumer.apply(logger).forRoutes(PostController, UsersController);
    /* 전체 허용을 할 경우 */
    // consumer.apply(AuthMiddleware).forRoutes({
    //   path: '*',
    //   method: RequestMethod.ALL,
    // });
  }
}
