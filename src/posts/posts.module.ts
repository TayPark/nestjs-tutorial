import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostsModule {}
