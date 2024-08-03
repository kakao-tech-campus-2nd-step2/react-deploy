import type { CategoryData, ProductData, ProductOptionsData } from '@/types';

export type RegisterUserRequest = {
  email: string;
  password: string;
};

export type RegisterUserResponse = {
  token: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  token: string;
};

export type UserPointResponse = {
  points: number;
};

export type AddToWishlistResponse = {
  success: boolean;
  message: string;
};

export type ProductRequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

export type CreateOrderRequestParams = {
  optionId: string | number;
  quantity: number;
  message: string;
  points?: number;
};

export type OrderListRequestParams = {
  page: number;
  size: number;
  sort: string;
};

export type PaginationResponseData<T> = {
  contents: T[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type ProductDetailRequestParams = {
  productId: string;
};

export type ProductDetailResponseData = ProductData;

export type ProductOptionsResponseData = ProductOptionsData[];

export type CategoryResponseData = CategoryData[];
