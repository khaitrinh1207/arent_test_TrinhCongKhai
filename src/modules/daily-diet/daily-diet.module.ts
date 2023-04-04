import { Module } from '@nestjs/common';
import { DailyDietService } from './daily-diet.service';
import { DailyDietController } from './daily-diet.controller';
import { LoggerModule } from '../../logger/logger.module';
import { PrismaService } from '../../shared/base';

@Module({
  imports: [LoggerModule],
  providers: [DailyDietService, PrismaService],
  controllers: [DailyDietController],
})
export class DailyDietModule {}
