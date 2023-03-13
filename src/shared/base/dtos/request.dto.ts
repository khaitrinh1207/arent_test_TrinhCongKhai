import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Max } from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
  MAX_PAGE_LIMIT,
  VALIDATE_MESSAGE,
} from '../../constants';

export interface IPaginationRequest {
  page: number;
  pageSize: number;
}

export class RequestDTO implements IPaginationRequest {
  @ApiProperty({
    description: 'Current page number',
    default: DEFAULT_PAGE,
    required: false,
  })
  @Type(() => Number)
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    default: DEFAULT_PAGE_LIMIT,
    required: false,
  })
  @Type(() => Number)
  @Max(MAX_PAGE_LIMIT, {
    message: VALIDATE_MESSAGE.MAX_PAGE_LIMIT.message.replace(
      '{0}',
      MAX_PAGE_LIMIT.toString(),
    ),
  })
  pageSize: number;
}
