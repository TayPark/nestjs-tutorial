import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('config')
  config(): string {
    const dbUser = this.configService.get<string>('MYSQL_USER');
    return dbUser;
  }
}
