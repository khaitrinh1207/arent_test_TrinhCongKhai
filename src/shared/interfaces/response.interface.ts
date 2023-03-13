export interface IResponse<T> {
  statusCode: number;
  message?: string;
  data?: T;
  page?: number;
  pageSize?: number;
  total?: number;
  timestamp?: string | number;
  path?: string;
}
