import { HttpException, HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGE } from '../shared/constants';

type CustomExceptionOptions = {
  key?: string;
  message?: string;
  errors?: any;
  [key: string]: any;
};

export class CustomException extends HttpException {
  constructor(
    statusCode: HttpStatus = 400,
    options?: CustomExceptionOptions | string,
  ) {
    if (typeof options === 'string') {
      super(
        {
          message: options,
        },
        statusCode || HttpStatus.BAD_REQUEST,
      );
    } else {
      const { key, message, errors, ...rest } = options || {};
      super(
        {
          key: key || ERROR_MESSAGE.BAD_REQUEST.key,
          message: message || ERROR_MESSAGE.BAD_REQUEST.message,
          errors,
          ...rest,
        },
        statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
