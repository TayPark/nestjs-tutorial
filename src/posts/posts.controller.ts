import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Post as PostModel, Prisma } from '@prisma/client';
import { PostService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async find(): Promise<PostModel[]> {
    return this.postService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostModel> {
    return this.postService.findOne(id);
  }

  @Post()
  async create(@Body() data: Prisma.PostCreateInput): Promise<PostModel> {
    return this.postService.create(data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    data: Prisma.PostUpdateInput,
  ): Promise<PostModel> {
    return this.postService.updateOne(id, data);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<PostModel[]> {
    return this.postService.deleteOne(id);
  }
}
