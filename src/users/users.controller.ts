import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './model/users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.userService.join(userData);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') userId: number,
    @Body() updateData: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateOne(userId, updateData);
  }

  @Delete(':id')
  async deleteOne(@Param('id') userId: number) {
    return this.userService.deleteOne(userId);
  }
}
