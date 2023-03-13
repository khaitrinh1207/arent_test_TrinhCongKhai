import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { unixMoment } from '../helpers';
import { DateFormat } from '../enums';

export const ToDate = (property: DateFormat) => {
  return Transform(({ value }) => {
    const isValidDate = moment(value, property, true).isValid();
    return isValidDate ? unixMoment(value).toDate() : value;
  });
};

export const ToBoolean = () => {
  return Transform(({ value }) => {
    const typeValue = typeof value;
    if (typeValue === 'string') {
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
    }
    return value;
  });
};
