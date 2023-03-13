import { Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto, ResponsePaginationDto } from '../base';

export const CustomApiOkResponse =
  <TModel extends Type<any>>(
    model: TModel,
    options?: ApiResponseOptions,
  ): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOkResponse({
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    })(target, propertyKey, descriptor);
  };

export const CustomPaginatedResponse =
  <TModel extends Type<any>>(
    model: TModel,
    options?: ApiResponseOptions,
  ): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiOkResponse({
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponsePaginationDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })(target, propertyKey, descriptor);
  };
