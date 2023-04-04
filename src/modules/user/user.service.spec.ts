import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from '../../shared/base';
import { LoggerService } from '../../logger/logger.service';
import { UsersRequestDto } from './dtos';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService, LoggerService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.getUsers(new UsersRequestDto());
      expect(result.statusCode).toBe(HttpStatus.OK);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });
});
