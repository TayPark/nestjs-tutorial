import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array', () => {
    const result = service.find();
    expect(result).toBeInstanceOf(Array);
  });

  describe('Service.create()', () => {
    it('makes a User', async () => {
      const allUser = await service.find();
      service.join({ age: 5, name: 'Management' });
      const afterCreation = await service.find();

      expect(afterCreation.length).toBeGreaterThan(allUser.length);
    });
  });

  describe('Service.findOne()', () => {
    it('should return a instance of User', async () => {
      service.join({ age: 10, name: 'William' });
      const firstUser = await service.findOne(0);
      expect(firstUser).toBeDefined();
      expect(firstUser.id).toEqual(0);
    });

    it('should return a NOT_FOUND exception if trying to find unreal user', () => {
      try {
        service.findOne(9999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Service.updateOne', () => {
    it('update a user', async () => {
      service.join({ age: 10, name: 'William' });
      service.updateOne(0, { name: 'U.Will' });
      const updateUser = await service.findOne(0);
      expect(updateUser.name).toEqual('U.Will');
    });
  });

  describe('Service.deleteOne()', () => {
    it('deletes a user', async () => {
      service.join({ age: 5, name: 'mask' });

      const allUser = await service.find();
      service.deleteOne(0);
      const afterDelete = await service.find();

      expect(afterDelete.length).toBeLessThan(allUser.length);
    });
  });
});
