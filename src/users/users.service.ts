import { Injectable, NotFoundException } from '@nestjs/common';
import { User as UserModel } from './model/users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async find(): Promise<UserModel[]> {
    return this.prisma.user.findMany();
  }

  async findOne(userId: number): Promise<UserModel> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User id ${userId} is not exist`);
    }

    return user;
  }

  async findByName(userName: string): Promise<UserModel> {
    const user = await this.prisma.user.findFirst({
      where: { name: userName },
    });
    if (!user) {
      throw new NotFoundException(`No user.`);
    }
    return user;
  }

  async join(data: Prisma.UserCreateInput): Promise<UserModel> {
    return this.prisma.user.create({
      data,
    });
  }

  async signOut(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateOne(id: number, data: Prisma.UserUpdateInput): Promise<UserModel> {
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async deleteOne(id: number): Promise<UserModel> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
