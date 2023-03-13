import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiaryController } from './diary.controller';
import { LoggerModule } from '../logger/logger.module';
import { PrismaService } from '../shared/base';

@Module({
  imports: [LoggerModule],
  controllers: [DiaryController],
  providers: [DiaryService, PrismaService],
})
export class DiaryModule {
}
