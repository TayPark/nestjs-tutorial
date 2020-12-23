import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './model/users.model';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  // to use fake database
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  findOne(userId: number): User {
    const userData = this.users.find((user) => user.id === userId);
    if (!userData) {
      throw new NotFoundException(`User not found id: ${userId}`);
    }
    return userData;
  }

  create(createData: CreateUserDto): User[] {
    this.users.push({
      id: this.users.length, // auto_increment
      ...createData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.users;
  }

  updateOne(userId: number, updateData: UpdateUserDto): User[] {
    const user = this.findOne(userId);
    this.deleteOne(userId);
    this.users.push({ ...user, ...updateData, updatedAt: new Date() });

    return this.users;
  }

  deleteOne(userId: number) {
    this.findOne(userId);
    this.users = this.users.filter((user) => user.id !== userId);
  }
}
