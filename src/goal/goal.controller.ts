import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GoalService } from './goal.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_GUARD_TYPE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../shared/constants';
import { ResponseDto, ResponseErrorDTO } from '../shared/base';
import { CurrentUser, CustomApiOkResponse } from '../shared/decorators';
import { GoalRequestDto, ProgressDailyResponseDto } from './dtos';

@Controller('goals')
@ApiTags('goals')
@UseGuards(AuthGuard(AUTH_GUARD_TYPE))
export class GoalController {
  constructor(private readonly service: GoalService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create user goal',
  })
  @ApiBody({
    type: GoalRequestDto,
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
  async createUserGoal(
    @CurrentUser('id') userId: string,
    @Body() data: GoalRequestDto,
  ) {
    return this.service.createUserGoal(userId, data);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update user goal',
  })
  @ApiBody({
    type: GoalRequestDto,
  })
  @ApiOkResponse({
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
  @Put()
  async updateUserGoal(
    @CurrentUser('id') userId: string,
    @Body() data: GoalRequestDto,
  ): Promise<ResponseDto<string>> {
    return this.service.updateUserGoal(userId, data);
  }

  @ApiBearerAuth()
  @CustomApiOkResponse(ProgressDailyResponseDto)
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @Get('achievement-rate')
  async getAchievementRate(
    @CurrentUser('id') id: string,
  ): Promise<ResponseDto<ProgressDailyResponseDto>> {
    return await this.service.getAchievementRate(id);
  }
}
