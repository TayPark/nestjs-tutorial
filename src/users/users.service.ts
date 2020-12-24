import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model/users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async find(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User id ${userId} is not exist`);
    }

    return user;
  }

  async join(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async signOut(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async updateOne(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      data,
      where: { id },
    });
  }

  async deleteOne(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  /**
   * @deprecated due to use real DB
   */
  // findAll(): User[] {
  //   return this.users;
  // }

  // findOne(userId: number): User {
  //   const userData = this.users.find((user) => user.id === userId);
  //   if (!userData) {
  //     throw new NotFoundException(`User not found id: ${userId}`);
  //   }
  //   return userData;
  // }

  // create(createData: CreateUserDto): User[] {
  //   this.users.push({
  //     id: this.users.length, // auto_increment
  //     ...createData,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   return this.users;
  // }

  // updateOne(userId: number, updateData: UpdateUserDto): User[] {
  //   const user = this.findOne(userId);
  //   this.deleteOne(userId);
  //   this.users.push({ ...user, ...updateData, updatedAt: new Date() });

  //   return this.users;
  // }

  // deleteOne(userId: number): User[] {
  //   this.users = this.users.filter((user) => user.id !== userId);
  //   return this.users;
  // }
}
