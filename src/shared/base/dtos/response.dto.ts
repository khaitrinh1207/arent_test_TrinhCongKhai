import { ApiProperty } from '@nestjs/swagger';

interface IResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  page?: number;
  pageSize?: number;
  total?: number;
}

export class ResponsePaginationDto<T> implements IResponse<T> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  data?: T;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  pageSize?: number;

  @ApiProperty()
  total?: number;
}

export class ResponseDto<T> implements IResponse<T> {
  @ApiProperty({
    type: Number,
  })
  statusCode: number;

  @ApiProperty()
  data?: T;
}

export class ResponseErrorDTO implements IResponse<null> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
