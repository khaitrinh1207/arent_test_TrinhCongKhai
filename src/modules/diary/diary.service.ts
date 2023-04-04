import { HttpStatus, Injectable } from '@nestjs/common';
import { DiariesRequestDto, DiariesResponseDto, DiaryRequestDto } from './dtos';
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
export class DiaryService extends BaseService {
  constructor(logger: LoggerService, prisma: PrismaService) {
    super(logger, prisma);
  }

  // create diary
  async create(
    userId: string,
    input: DiaryRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      await this.prisma.diary.create({
        data: {
          ...input,
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

  // get list diary
  async findAll(
    userId: string,
    queries: DiariesRequestDto,
  ): Promise<ResponsePaginationDto<DiariesResponseDto[]>> {
    try {
      const { skip, take, page, pageSize } = parseQueries(queries);
      const [exercises, total] = await Promise.all([
        this.prisma.diary.findMany({
          where: {
            createdById: userId,
            isDelete: false,
          },
          select: {
            id: true,
            title: true,
            content: true,
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

  async findOne(id: string): Promise<ResponseDto<DiariesResponseDto>> {
    try {
      const diary = await this.prisma.diary.findFirst({
        where: {
          id,
          isDelete: false,
        },
      });
      return toResponse(
        HttpStatus.OK,
        omitType(diary, ['updatedAt', 'isDelete']),
      );
    } catch (error) {
      this.handleException(error);
    }
  }

  async update(
    id: string,
    input: DiaryRequestDto,
  ): Promise<ResponseDto<string>> {
    try {
      await this.prisma.diary.update({
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
      this.prisma.diary.update({
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
