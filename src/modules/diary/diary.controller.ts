import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { DiariesRequestDto, DiariesResponseDto, DiaryRequestDto } from './dtos';
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
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_GUARD_TYPE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/shared/constants';
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

@Controller('diaries')
@ApiTags('diaries')
@UseGuards(AuthGuard(AUTH_GUARD_TYPE))
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'create diary',
  })
  @ApiBody({
    type: DiaryRequestDto,
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
    @Body() data: DiaryRequestDto,
  ): Promise<ResponseDto<string>> {
    return this.diaryService.create(userId, data);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get list diaries',
  })
  @CustomPaginatedResponse(DiariesResponseDto)
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
    @Query() queries: DiariesRequestDto,
    @CurrentUser('id') userId: string,
  ): Promise<ResponsePaginationDto<DiariesResponseDto[]>> {
    return this.diaryService.findAll(userId, queries);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get diary by id',
  })
  @CustomApiOkResponse(DiariesResponseDto)
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
  ): Promise<ResponseDto<DiariesResponseDto>> {
    return this.diaryService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update diary',
  })
  @ApiBody({
    type: DiaryRequestDto,
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
  update(
    @Param('id') id: string,
    @Body() data: DiaryRequestDto,
  ): Promise<ResponseDto<string>> {
    return this.diaryService.update(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'del diary',
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
    return this.diaryService.remove(id);
  }
}
