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
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): User {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() userData: CreateUserDto): User[] {
    return this.userService.create(userData);
  }

  @Patch(':id')
  updateOne(
    @Param('id') userId: number,
    @Body() updateData: UpdateUserDto,
  ): User[] {
    return this.userService.updateOne(userId, updateData);
  }

  @Delete(':id')
  deleteOne(@Param('id') userId: number) {
    return this.userService.deleteOne(userId);
  }
}
