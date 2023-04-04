import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { LoggerModule } from '../../logger/logger.module';
import { PrismaService } from '../../shared/base';

@Module({
  imports: [LoggerModule],
  controllers: [ExerciseController],
  providers: [ExerciseService, PrismaService],
})
export class ExerciseModule {}
