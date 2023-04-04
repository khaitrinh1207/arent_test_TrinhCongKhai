import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  UsersRequestDto,
  UpdateUserRequestDto,
  UserByIdResponseDto,
  UsersResponseDto,
} from './dtos';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_GUARD_TYPE,
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from '../../shared/constants';
import {
  CustomApiOkResponse,
  CustomPaginatedResponse,
} from '../../shared/decorators';
import {
  ResponseDto,
  ResponseErrorDTO,
  ResponsePaginationDto,
} from '../../shared/base';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard(AUTH_GUARD_TYPE))
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get list users',
  })
  @CustomPaginatedResponse(UsersResponseDto)
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @Get()
  async getUsers(
    @Query() queries: UsersRequestDto,
  ): Promise<ResponsePaginationDto<UsersResponseDto[]>> {
    return await this.service.getUsers(queries);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'get user by id',
  })
  @CustomApiOkResponse(UserByIdResponseDto)
  @ApiUnauthorizedResponse({
    type: ResponseErrorDTO,
    description: ERROR_MESSAGE.UNAUTHORIZED.message,
  })
  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<ResponseDto<UserByIdResponseDto>> {
    return await this.service.getUserById(id);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'update user',
  })
  @ApiBody({
    type: UpdateUserRequestDto,
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
  async updateUserById(
    @Param('id') id: string,
    @Body() data: UpdateUserRequestDto,
  ): Promise<ResponseDto<string>> {
    return await this.service.updateUserById(id, data);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'delete user',
  })
  @ApiNoContentResponse({
    type: ResponseErrorDTO,
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
  async deleteUserById(@Param('id') id: string): Promise<ResponseDto<string>> {
    return await this.service.deleteUserById(id);
  }
}
