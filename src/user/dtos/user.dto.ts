import { ApiProperty, PickType } from '@nestjs/swagger';
import { RequestDTO } from '../../shared/base';
import { IsOptional } from 'class-validator';
import { ToDate } from '../../shared/decorators';
import { DateFormat } from '../../shared/enums';
import { UserDto } from '../../shared/generates/prisma/dtos';
import { BodyFat, Calorie, Weight } from '../../shared/generates/prisma/models';

export class UsersRequestDto extends RequestDTO {}

export class UsersResponseDto extends PickType(UserDto, [
  'id',
  'username',
  'email',
  'birthday',
  'address',
]) {
  isDelete?: boolean;
  updatedAt?: string;
  createdAt?: string;
  password?: string;
  isAdmin?: string;
}

export class UserByIdResponseDto extends PickType(UserDto, [
  'id',
  'username',
  'email',
  'birthday',
  'address',
]) {
  isDelete?: boolean;
  updatedAt?: string;
  createdAt?: string;
  password?: string;
  isAdmin?: string;

  @ApiProperty()
  bodyFat: BodyFat;

  @ApiProperty()
  calorie: Calorie;

  @ApiProperty()
  weight: Weight;
}

export class UpdateUserRequestDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ToDate(DateFormat.DATE)
  birthday?: Date;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  email?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  address?: string;

  @ApiProperty({
    required: false,
  })
  weight?: number;

  @ApiProperty({
    required: false,
  })
  calorie?: number;

  @ApiProperty({
    required: false,
  })
  bodyFat?: number;
}
