import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserModel } from './model/users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UserModel> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.join(userData);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') userId: number,
    @Body() updateData: UpdateUserDto,
  ): Promise<UserModel> {
    return this.userService.updateOne(userId, updateData);
  }

  @Delete(':id')
  async deleteOne(@Param('id') userId: number) {
    return this.userService.deleteOne(userId);
  }
}
