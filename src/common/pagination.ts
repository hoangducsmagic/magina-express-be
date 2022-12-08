import { SortOrder } from 'mongoose';
import { Request } from '@hapi/hapi';

export interface IPaginationParams {
  limit: number;
  offset: number;
  page: number;
  sortType: SortOrder;
  sortField: string;
  search?: string;
}

export interface IPagination {
  page: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

export interface ICommonFilterRequest extends Request {
  query: IPaginationParams;
}

export interface IResponseList<T> {
  items: T;
  pagination: IPagination;
}
