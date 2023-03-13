import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseService, PrismaService, ResponseDto } from '../shared/base';
import { LoggerService } from '../logger/logger.service';
import { GraphResponseDto, GraphTypeDto } from './dtos';
import { toResponse, unixMoment } from '../shared/helpers';
import { UserService } from '../user/user.service';

@Injectable()
export class GraphService extends BaseService {
  constructor(
    logger: LoggerService,
    prisma: PrismaService,
    private readonly userService: UserService,
  ) {
    super(logger, prisma);
  }

  async getPercentageGraph(
    userId: string,
    months: number,
  ): Promise<ResponseDto<GraphResponseDto>> {
    try {
      const graph = await this.createGraph(userId, months);
      return toResponse(HttpStatus.OK, { userId, graph });
    } catch (error) {
      this.handleException(error);
    }
  }

  private async createGraph(
    userId: string,
    months: number,
  ): Promise<GraphTypeDto[]> {
    const { bodyFats, weights } = await this.userService.getUserInfo(userId);
    const metrics: GraphTypeDto[] = [];
    for (let i = months; i > 0; i--) {
      const beforeTime = new Date(
        unixMoment()
          .subtract(i - 1, 'months')
          .startOf('months')
          .format('YYYY-MM-DD'),
      );
      const afterTime = new Date(
        unixMoment()
          .subtract(i - 1, 'months')
          .endOf('months')
          .format('YYYY-MM-DD'),
      );
      const avg = await this.prisma.goalProgressDaily.aggregate({
        where: {
          userId,
          recordedAt: {
            gte: beforeTime,
            lte: afterTime,
          },
          isDelete: false,
        },
        _avg: {
          weight: true,
          bodyFat: true,
          progress: true,
          calorie: true,
        },
      });
      metrics.push({
        recordedAt: `${beforeTime.getFullYear()}-${beforeTime.getMonth() + 1}`,
        weightPercentage: (avg._avg.weight / weights[0]?.value || 0) * 100,
        bodyFatPercentage: (avg._avg.bodyFat / bodyFats[0]?.value || 0) * 100,
      });
    }
    return metrics;
  }
}
