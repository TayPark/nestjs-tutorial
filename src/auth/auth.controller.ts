import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStragegy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { verify } from 'jsonwebtoken';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    // console.log(req.user); // UserModel Object
    console.log(req.user);
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
