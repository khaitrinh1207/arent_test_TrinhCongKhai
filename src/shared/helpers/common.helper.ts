import * as moment from 'moment';
import { RequestDTO } from '../base';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '../constants';
import { HttpStatus } from '@nestjs/common';
import { IResponse } from '../interfaces';
import * as _ from 'lodash';

export const unixMoment = moment.utc;

export const omitType = <T>(obj: object, keys: (keyof T)[] = []) => {
  return _.omit(obj, [...keys]) as T;
};

export const parseQueries = <T extends RequestDTO>(
  queries: T,
): T & {
  skip: number;
  take: number;
} => {
  const { page = DEFAULT_PAGE, pageSize = DEFAULT_PAGE_LIMIT } = queries;

  const skip = (page - 1) * pageSize;

  return {
    ...queries,
    page,
    pageSize,
    skip,
    take: pageSize,
  };
};

export const toResponse = <T>(
  statusCode: HttpStatus | number,
  data: T,
  page?: number,
  pageSize?: number,
  total?: number,
): IResponse<T> => ({
  statusCode,
  data,
  page,
  pageSize,
  total,
});
