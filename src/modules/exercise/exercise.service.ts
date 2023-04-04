import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ExercisePutRequestDto,
  ExercisesRequestDto,
  ExercisesResponseDto,
} from './dtos';
import { ExerciseRequestDto } from './dtos';
import {
  BaseService,
  PrismaService,
  ResponseDto,
  ResponsePaginationDto,
} from '../../shared/base';
import { LoggerService } from '../../logger/logger.service';
import { SUCCESS_MESSAGE } from '../../shared/constants';
import { omitType, parseQueries, toResponse } from '../../shared/helpers';

@Injectable()
export class ExerciseService extends BaseService {
  constructor(logger: LoggerService, prisma: PrismaService) {
    super(logger, prisma);
  }

  // create exercise
  async create(
    userId: string,
    createExerciseDto: ExerciseRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      await this.prisma.dailyTask.create({
        data: {
          ...createExerciseDto,
          createdById: userId,
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

  async findAll(
    userId: string,
    queries: ExercisesRequestDto,
  ): Promise<ResponsePaginationDto<ExercisesResponseDto[]>> {
    try {
      const { skip, take, page, pageSize } = parseQueries(queries);
      const [exercises, total] = await Promise.all([
        this.prisma.dailyTask.findMany({
          where: {
            createdById: userId,
            isDelete: false,
          },
          select: {
            id: true,
            taskType: true,
            description: true,
            completedDate: true,
            taskName: true,
            taskStatus: true,
            createdAt: true,
          },
          skip,
          take,
        }),
        this.prisma.dailyTask.count({
          where: {
            createdById: userId,
            isDelete: false,
          },
        }),
      ]);
      return toResponse(HttpStatus.OK, exercises, page, pageSize, total);
    } catch (error) {
      this.handleException(error);
    }
  }

  async findOne(id: string): Promise<ResponseDto<ExercisesResponseDto>> {
    try {
      const exercise = await this.prisma.dailyTask.findFirst({
        where: {
          id,
          isDelete: false,
        },
      });
      return toResponse(
        HttpStatus.OK,
        omitType(exercise, ['updatedAt', 'isDelete']),
      );
    } catch (error) {
      this.handleException(error);
    }
  }

  // update exercise
  async update(
    id: string,
    input: ExercisePutRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      await this.prisma.dailyTask.update({
        where: {
          id,
        },
        data: {
          ...input,
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

  async remove(id: string): Promise<ResponseDto<string>> {
    try {
      this.prisma.dailyTask.update({
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
    } catch (error) {
      this.handleException(error);
    }
  }
}
