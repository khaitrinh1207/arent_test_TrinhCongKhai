import { Module } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphController } from './graph.controller';
import { UserModule } from '../user/user.module';
import { LoggerModule } from '../../logger/logger.module';
import { PrismaService } from '../../shared/base';

@Module({
  imports: [LoggerModule, UserModule],
  controllers: [GraphController],
  providers: [GraphService, PrismaService],
})
export class GraphModule {}
