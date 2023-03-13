import { ApiProperty, PickType } from '@nestjs/swagger';
import { ToDate } from '../../shared/decorators';
import { DateFormat } from '../../shared/enums';
import { IsEmail, IsOptional } from 'class-validator';
import { UserDto } from '../../shared/generates/prisma/dtos';

export class UserRegisterDto extends PickType(UserDto, [
  'username',
  'password',
  'address',
]) {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @ToDate(DateFormat.DATE)
  birthday?: Date;

  @ApiProperty({
    required: false,
  })
  @IsEmail()
  email?: string;
}

export class LoginRequestDto extends PickType(UserDto, [
  'username',
  'password',
]) {}

export class TokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  expiredAt: number;
}
