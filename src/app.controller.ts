import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { AppService } from './app.service';
import { User as UserModel } from './users/model/users.model';

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

  @Get('serialize')
  @SerializeOptions({
    excludePrefixes: ['_'], // 해당 접두사를 가진 프로퍼티를 제외한다.
  })
  @UseInterceptors(ClassSerializerInterceptor)
  returnOneUser(): UserModel {
    return new UserModel({
      id: 1,
      name: 'taypark',
      password: '1q2w3e4r!', // user model에서 @Exclude() 데코레이터로 인해 password가 제외된다.
      age: 26,
    });
  }
}
