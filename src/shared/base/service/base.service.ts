import { HttpStatus } from '@nestjs/common';
import { LoggerService } from '../../../logger/logger.service';
import { PrismaService } from './prisma.service';
import { ERROR_MESSAGE } from '../../constants';
import { CustomException } from '../../../exceptions/custom.exception';

export class BaseService {
  constructor(
    public readonly logger: LoggerService,
    public readonly prisma: PrismaService,
  ) {}

  handleException(
    error: any,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    message: {
      key: string;
      message: string;
    } = ERROR_MESSAGE.BAD_REQUEST,
  ) {
    this.logger.error(error);
    if (error instanceof CustomException) {
      throw error;
    }
    throw new CustomException(status, {
      ...message,
      errors: [error],
    });
  }
}
