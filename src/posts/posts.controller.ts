import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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
  async create(@Body() data: CreatePostDto): Promise<PostModel> {
    return this.postService.create(data);
  }

  @Patch()
  async updateOne(
    @Param('id') id: number,
    data: UpdatePostDto,
  ): Promise<PostModel> {
    return this.postService.updateOne(id, data);
  }

  @Delete()
  async deleteOne(@Param('id') id: number): Promise<PostModel[]> {
    return this.postService.deleteOne(id);
  }
}
