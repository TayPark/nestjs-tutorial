import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(username);
    console.log(`Login requested with ${username}, ${password}`);
    if (user && user.password === password) {
      return {
        username,
        password,
      };
    }
    return null;
  }

  async login(user: any) {
    /* Of course, don't add password in jwt token!! */
    const payload = { username: user.username, password: user.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async profiling(token: string) {
    return this.jwtService.decode(token);
  }
}
