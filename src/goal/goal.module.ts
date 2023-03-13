import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { LoggerModule } from '../logger/logger.module';
import { PrismaService } from '../shared/base/service/prisma.service';

@Module({
  imports: [LoggerModule],
  providers: [GoalService, PrismaService],
  controllers: [GoalController],
})
export class GoalModule {}
