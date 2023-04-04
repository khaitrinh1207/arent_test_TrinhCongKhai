import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import {
  ExerciseRequestDto,
  ExercisePutRequestDto,
  ExercisesRequestDto,
  ExercisesResponseDto,
} from './dtos';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AUTH_GUARD_TYPE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/shared/constants';
import { AuthGuard } from '@nestjs/passport';
import {
  ResponseDto,
  ResponseErrorDTO,
  ResponsePaginationDto,
} from '../../shared/base';
import {
  CurrentUser,
  CustomApiOkResponse,
  CustomPaginatedResponse,
} from '../../shared/decorators';

@Controller('exercises')
@ApiTags('exercises')
@UseGuards(AuthGuard(AUTH_GUARD_TYPE))
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create exercise',
  })
  @ApiBody({
    type: ExerciseRequestDto,
  })
  @ApiCreatedResponse({
    type: ResponseDto,
    description: SUCCESS_MESSAGE.SUCCESS.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @Post()
  create(
    @CurrentUser('id') userId: string,
    @Body() createExerciseDto: ExerciseRequestDto,
  ): Promise<ResponseDto<string>> {
    return this.exerciseService.create(userId, createExerciseDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get list exercise',
  })
  @CustomPaginatedResponse(ExercisesResponseDto)
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @Get()
  async findAll(
    @Query() queries: ExercisesRequestDto,
    @CurrentUser('id') userId: string,
  ): Promise<ResponsePaginationDto<ExercisesResponseDto[]>> {
    return this.exerciseService.findAll(userId, queries);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get exercise by id',
  })
  @CustomApiOkResponse(ExercisesResponseDto)
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDto<ExercisesResponseDto>> {
    return this.exerciseService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update exercise',
  })
  @ApiBody({
    type: ExercisePutRequestDto,
  })
  @ApiOkResponse({
    type: ResponseDto,
    description: SUCCESS_MESSAGE.SUCCESS.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: ExercisePutRequestDto,
  ): Promise<ResponseDto<string>> {
    return this.exerciseService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'del exercise',
  })
  @ApiNoContentResponse({
    type: ResponseDto,
    description: SUCCESS_MESSAGE.SUCCESS.message,
  })
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @ApiBadRequestResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.BAD_REQUEST.message,
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ResponseDto<string>> {
    return this.exerciseService.remove(id);
  }
}
