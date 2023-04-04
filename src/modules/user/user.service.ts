import { HttpStatus, Injectable } from '@nestjs/common';
import {
  BaseService,
  PrismaService,
  ResponseDto,
  ResponsePaginationDto,
} from 'src/shared/base';
import {
  UsersRequestDto,
  UpdateUserRequestDto,
  UserByIdResponseDto,
  UsersResponseDto,
} from './dtos';
import { Prisma } from '@prisma/client';
import { LoggerService } from '../../logger/logger.service';
import {
  omitType,
  parseQueries,
  toResponse,
  unixMoment,
} from '../../shared/helpers';
import {
  ERROR_MESSAGE,
  SORTED_DESC,
  SUCCESS_MESSAGE,
  TAKE_MIN,
} from '../../shared/constants';
import { CustomException } from '../../exceptions/custom.exception';

@Injectable()
export class UserService extends BaseService {
  constructor(readonly logger: LoggerService, readonly prisma: PrismaService) {
    super(logger, prisma);
  }

  async getUsers(
    queries: UsersRequestDto,
  ): Promise<ResponsePaginationDto<UsersResponseDto[]>> {
    try {
      const { skip, take, page, pageSize } = parseQueries(queries);
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where: {
            isDelete: false,
          },
          select: {
            id: true,
            username: true,
            address: true,
            email: true,
            birthday: true,
          },
          skip,
          take,
        }),
        this.prisma.user.count({
          where: {
            isDelete: false,
          },
        }),
      ]);
      return toResponse(HttpStatus.OK, users, page, pageSize, total);
    } catch (error) {
      this.handleException(
        error,
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGE.BAD_REQUEST,
      );
    }
  }

  async getUserById(id: string): Promise<ResponseDto<UserByIdResponseDto>> {
    try {
      const user = await this.getUserInfo(id);

      // get value at the nearest time
      const findFirstArgs:
        | Prisma.BodyFatFindFirstArgs
        | Prisma.WeightFindFirstArgs
        | Prisma.CalorieFindFirstArgs = {
        where: {
          userId: user.id,
        },
        select: {
          value: true,
        },
        take: TAKE_MIN,
        orderBy: {
          recordedAt: SORTED_DESC,
        },
      };
      const [bodyFat, weight, calorie] = await Promise.all([
        this.prisma.bodyFat.findFirst(findFirstArgs),
        this.prisma.weight.findFirst(findFirstArgs),
        this.prisma.calorie.findFirst(findFirstArgs),
      ]);

      return toResponse(
        HttpStatus.OK,
        omitType({ ...user, bodyFat, weight, calorie }, [
          'createdAt',
          'updatedAt',
          'isDelete',
          'password',
          'isAdmin',
        ]),
      );
    } catch (error) {
      this.handleException(
        error,
        HttpStatus.BAD_REQUEST,
        ERROR_MESSAGE.BAD_REQUEST,
      );
    }
  }

  async getUserInfo(id: string) {
    const selectMetricArgs:
      | Prisma.BodyFatFindFirstArgs
      | Prisma.WeightFindFirstArgs
      | Prisma.CalorieFindFirstArgs = {
      select: {
        value: true,
      },
      take: TAKE_MIN,
      orderBy: {
        recordedAt: SORTED_DESC,
      },
    };
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        isDelete: false,
      },
      include: {
        bodyFats: selectMetricArgs,
        calories: selectMetricArgs,
        weights: selectMetricArgs,
        goal: true,
      },
    });
    if (!user) {
      throw new CustomException(
        HttpStatus.NOT_FOUND,
        ERROR_MESSAGE.USER_NOT_EXISTS,
      );
    }
    return user;
  }

  async updateUserById(
    id: string,
    dataUpdate: UpdateUserRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      const { birthday, address, email } = dataUpdate;
      const user = await this.getUserInfo(id);
      if (user) {
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            birthday,
            address,
            email,
            bodyFats: {
              createMany: {
                data: [
                  {
                    value: dataUpdate.bodyFat,
                    recordedAt: unixMoment().toISOString(),
                  },
                ],
              },
            },
            weights: {
              createMany: {
                data: [
                  {
                    value: dataUpdate.weight,
                    recordedAt: unixMoment().toISOString(),
                  },
                ],
              },
            },
            calories: {
              createMany: {
                data: [
                  {
                    value: dataUpdate.calorie,
                    recordedAt: unixMoment().toISOString(),
                  },
                ],
              },
            },
          },
        });

        return {
          statusCode: HttpStatus.OK,
          data: SUCCESS_MESSAGE.SUCCESS.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: ERROR_MESSAGE.BAD_REQUEST.message,
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async deleteUserById(id: string): Promise<ResponseDto<string>> {
    try {
      const user = await this.getUserInfo(id);
      if (user) {
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            isDelete: true,
          },
        });

        return {
          statusCode: HttpStatus.NO_CONTENT,
          data: SUCCESS_MESSAGE.SUCCESS.message,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: ERROR_MESSAGE.BAD_REQUEST.message,
      };
    } catch (error) {
      this.handleException(error);
    }
  }
}
