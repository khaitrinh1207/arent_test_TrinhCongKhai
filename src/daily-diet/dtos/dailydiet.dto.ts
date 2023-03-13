import { ApiProperty, PickType } from '@nestjs/swagger';
import { DailyDietDto } from '../../shared/generates/prisma/dtos';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { MealType } from '../../shared/enums';
import { VALIDATE_MESSAGE } from '../../shared/constants';
import { Type } from 'class-transformer';

export class DailyDietRequestDto extends PickType(DailyDietDto, ['calorie']) {
  @ApiProperty({
    enum: MealType,
  })
  @IsEnum(MealType, {
    message: VALIDATE_MESSAGE.MEAL_TYPE.message,
  })
  @IsNotEmpty()
  @Type(() => Number)
  mealType: MealType;
}
