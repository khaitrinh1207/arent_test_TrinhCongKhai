import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, UserRegisterDto, TokenResponseDto } from './dtos';
import { ResponseDto } from '../shared/base';
import { CustomApiOkResponse } from '../shared/decorators';
import { SUCCESS_MESSAGE } from '../shared/constants';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(readonly service: AuthService) {}

  @ApiOperation({
    summary: 'register user',
  })
  @ApiBody({
    type: UserRegisterDto,
  })
  @ApiCreatedResponse({
    type: ResponseDto,
    description: SUCCESS_MESSAGE.SUCCESS.message,
  })
  @Post('/sign-up')
  async signUp(@Body() user: UserRegisterDto) {
    return this.service.signUp(user);
  }

  @ApiOperation({
    summary: 'login',
  })
  @ApiBody({
    type: LoginRequestDto,
  })
  @CustomApiOkResponse(TokenResponseDto)
  @Post('/sign-in')
  async signIn(
    @Body() data: LoginRequestDto,
  ): Promise<ResponseDto<TokenResponseDto>> {
    return this.service.signIn(data);
  }
}
