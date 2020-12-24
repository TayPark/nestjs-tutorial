import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './model/posts.model';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(): Promise<Post[]> {
    return this.prismaService.post.findMany();
  }

  async findOne(id: number): Promise<Post> {
    return this.prismaService.post.findFirst({
      where: { id },
    });
  }

  async updateOne(id: number, data: UpdatePostDto): Promise<Post> {
    return this.prismaService.post.update({
      where: { id },
      data,
    });
  }

  async create(data: CreatePostDto): Promise<Post> {
    console.log(data);
    return this.prismaService.post.create({
      data,
    });
  }

  async deleteOne(id: number): Promise<Post[]> {
    this.prismaService.post.delete({ where: { id } });
    return this.find();
  }
}
