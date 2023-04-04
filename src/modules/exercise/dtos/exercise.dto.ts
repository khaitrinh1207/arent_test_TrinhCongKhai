import { ApiProperty, PickType } from '@nestjs/swagger';
import { RequestDTO } from '../../../shared/base';
import { DailyTaskDto } from '../../../shared/generates/prisma/dtos';
import { TaskType } from '../../../shared/enums';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { VALIDATE_MESSAGE } from '../../../shared/constants';
import { Type } from 'class-transformer';

export class ExercisesRequestDto extends RequestDTO {}

export class ExerciseRequestDto extends PickType(DailyTaskDto, [
  'taskName',
  'taskStatus',
  'description',
  'taskStatus',
]) {
  @ApiProperty({
    enum: TaskType,
  })
  @IsEnum(TaskType, {
    message: VALIDATE_MESSAGE.TASK_TYPE.message,
  })
  @IsNotEmpty()
  @Type(() => Number)
  taskType: number;
}

export class ExercisePutRequestDto extends PickType(DailyTaskDto, [
  'taskName',
  'taskStatus',
  'description',
  'taskStatus',
  'completedDate',
]) {
  @ApiProperty({
    enum: TaskType,
    required: false,
  })
  @IsEnum(TaskType, {
    message: VALIDATE_MESSAGE.TASK_TYPE.message,
  })
  @Type(() => Number)
  taskType: number;
}

export class ExercisesResponseDto extends PickType(DailyTaskDto, [
  'id',
  'taskType',
  'description',
  'completedDate',
  'taskName',
  'taskStatus',
  'createdAt',
]) {
  isDelete?: boolean;
  updatedAt?: string;
}
