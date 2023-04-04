import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './middlewares';
import { PrismaService } from './shared/base';
import { UserModule } from './modules/user/user.module';
import { GoalModule } from './modules/goal/goal.module';
import { DailyDietModule } from './modules/daily-diet/daily-diet.module';
import { GraphModule } from './modules/graph/graph.module';
import { ExerciseModule } from './modules/exercise/exercise.module';
import { DiaryModule } from './modules/diary/diary.module';

@Module({
  imports: [
    LoggerModule,
    AuthModule,
    UserModule,
    GoalModule,
    DailyDietModule,
    GraphModule,
    ExerciseModule,
    DiaryModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
