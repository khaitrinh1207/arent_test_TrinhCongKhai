import { HttpStatus, Injectable } from '@nestjs/common';
import { GoalRequestDto, ProgressDailyResponseDto } from './dtos';
import * as _ from 'lodash';
import { BaseService, PrismaService, ResponseDto } from '../../shared/base';
import { LoggerService } from 'src/logger/logger.service';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../shared/constants';
import { toResponse, unixMoment } from '../../shared/helpers';
import { CustomException } from '../../exceptions/custom.exception';

@Injectable()
export class GoalService extends BaseService {
  constructor(logger: LoggerService, prisma: PrismaService) {
    super(logger, prisma);
  }

  async createUserGoal(
    userId: string,
    data: GoalRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      await this.prisma.userGoal.create({
        data: {
          ...data,
          userId,
        },
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: SUCCESS_MESSAGE.SUCCESS.message,
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async updateUserGoal(
    userId: string,
    data: GoalRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      await this.prisma.userGoal.update({
        where: {
          userId,
        },
        data: {
          ...data,
        },
      });
      return {
        statusCode: HttpStatus.OK,
        data: SUCCESS_MESSAGE.SUCCESS.message,
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  // get achievement rate
  async getAchievementRate(
    userId: string,
  ): Promise<ResponseDto<ProgressDailyResponseDto>> {
    try {
      const today = new Date(unixMoment().format('YYYY-MM-DD'));
      const currentProgress = await this.prisma.goalProgressDaily.findFirst({
        where: {
          userId,
          recordedAt: today,
          isDelete: false,
        },
      });
      if (!currentProgress) {
        throw new CustomException(
          HttpStatus.NOT_FOUND,
          ERROR_MESSAGE.NOT_FOUND.message,
        );
      }
      return toResponse(
        HttpStatus.OK,
        _.pick(currentProgress, ['id', 'progress', 'recordedAt', 'userId']),
      );
    } catch (error) {
      this.handleException(error);
    }
  }
}
