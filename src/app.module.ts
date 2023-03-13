import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middlewares';
import { PrismaService } from './shared/base';
import { GoalModule } from './goal/goal.module';
import { DailyDietModule } from './daily-diet/daily-diet.module';
import { GraphModule } from './graph/graph.module';
import { ExerciseModule } from './exercise/exercise.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [LoggerModule, AuthModule, UserModule, GoalModule, DailyDietModule, GraphModule, ExerciseModule, DiaryModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
