import { PickType } from '@nestjs/swagger';
import {
  GoalProgressDailyDto,
  UserGoalDto,
} from '../../../shared/generates/prisma/dtos';

export class GoalRequestDto extends PickType(UserGoalDto, [
  'calorie',
  'bodyFat',
  'weight',
]) {}

export class ProgressDailyResponseDto extends PickType(GoalProgressDailyDto, [
  'id',
  'progress',
  'recordedAt',
  'userId',
]) {}
