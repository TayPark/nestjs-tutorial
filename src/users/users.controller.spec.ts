import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    service: new UsersService(new PrismaService());
    controller = new UsersController(service);

    // const module: TestingModule = await Test.createTestingModule({
    //   controllers: [UsersController],
    // }).compile();

    // controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
