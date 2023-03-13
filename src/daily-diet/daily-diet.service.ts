import { HttpStatus, Injectable } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { BaseService, PrismaService, ResponseDto } from '../shared/base';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../shared/constants';
import { DailyDietRequestDto } from './dtos';
import { unixMoment } from '../shared/helpers';
import { CustomException } from '../exceptions/custom.exception';

@Injectable()
export class DailyDietService extends BaseService {
  constructor(logger: LoggerService, prisma: PrismaService) {
    super(logger, prisma);
  }

  async createDailyDiet(
    userId: string,
    data: DailyDietRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      const today = new Date(unixMoment().format('YYYY-MM-DD'));

      // check goal progress today
      const goalProgressDaily = await this.prisma.goalProgressDaily.findFirst({
        where: {
          userId,
          isDelete: false,
          recordedAt: {
            equals: today,
          },
        },
        include: {
          dailyDiets: true,
        },
      });

      let checkExistDiet = false;
      if (goalProgressDaily?.dailyDiets) {
        checkExistDiet = goalProgressDaily.dailyDiets.some(
          (diet) => diet.mealType === data.mealType,
        );
      }
      if (!goalProgressDaily) {
        await this.prisma.dailyDiet.create({
          data: {
            ...data,
            recordedAt: unixMoment().format(),
            progressDaily: {
              create: {
                recordedAt: today,
                userId,
                calorie: data.calorie,
              },
            },
          },
        });
      } else if (goalProgressDaily && !checkExistDiet) {
        await this.prisma.goalProgressDaily.update({
          where: {
            id: goalProgressDaily.id,
          },
          data: {
            calorie: {
              increment: data.calorie,
            },
            dailyDiets: {
              create: {
                ...data,
                recordedAt: unixMoment().format(),
              },
            },
          },
        });
      }
      await this.updateGoalProgress(userId, today);
      return {
        statusCode: HttpStatus.CREATED,
        data: SUCCESS_MESSAGE.SUCCESS.message,
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  private async updateGoalProgress(userId: string, today: Date): Promise<void> {
    const targetCalorie = await this.prisma.userGoal.findFirst({
      where: {
        userId,
      },
      select: {
        calorie: true,
      },
    });
    const currentCalorie = await this.prisma.goalProgressDaily.findFirst({
      where: {
        userId,
        isDelete: false,
        recordedAt: {
          equals: today,
        },
      },
      select: {
        id: true,
        calorie: true,
      },
    });
    if (!targetCalorie && !currentCalorie) {
      throw new CustomException(HttpStatus.NOT_FOUND, ERROR_MESSAGE.NOT_FOUND);
    }
    const progress: number =
      (currentCalorie.calorie / targetCalorie.calorie) * 100;
    await this.prisma.goalProgressDaily.update({
      where: {
        id: currentCalorie.id,
      },
      data: {
        progress,
      },
    });
  }
}
