import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DailyDietService } from './daily-diet.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DailyDietRequestDto } from './dtos';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_GUARD_TYPE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../shared/constants';
import { ResponseDto, ResponseErrorDTO } from '../../shared/base';
import { CurrentUser } from '../../shared/decorators';

@Controller('daily-diets')
@ApiTags('daily-diets')
@UseGuards(AuthGuard(AUTH_GUARD_TYPE))
export class DailyDietController {
  constructor(private readonly service: DailyDietService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create daily diet',
  })
  @ApiBody({
    type: DailyDietRequestDto,
  })
  @ApiCreatedResponse({
    type: ResponseDto,
    description: SUCCESS_MESSAGE.SUCCESS.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @Post()
  async createDailyDiet(
    @CurrentUser('id') id: string,
    @Body() data: DailyDietRequestDto,
  ) {
    await this.service.createDailyDiet(id, data);
  }
}
