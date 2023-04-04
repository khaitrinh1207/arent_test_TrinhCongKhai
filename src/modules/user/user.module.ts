import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerModule } from '../../logger/logger.module';
import { PrismaService } from '../../shared/base';

@Module({
  imports: [LoggerModule],
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
