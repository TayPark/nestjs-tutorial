// default
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostService } from './posts/posts.service';
import { PostController } from './posts/posts.controller';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [AppController, PostController],
  providers: [AppService, PostService],
})
export class AppModule {}
