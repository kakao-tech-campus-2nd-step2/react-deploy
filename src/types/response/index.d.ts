import {
  ProductData,
  CategoryData, WishData, ProductOption,
} from '@/dto';

export type CategoryResponse = CategoryData[];

export interface CategoryProductsResponse {
  content: ProductData[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export type ProductDetailResponse = ProductData;

export type ProductOptionsResponse = ProductOption[];

export interface LoginResponse {
  email: string;
  token: string;
}

export interface RegisterResponse {
  email: string;
  token: string;
}

export interface AddWishesResponse {
  id: number,
  productId: number,
}

export interface WishedProductsResponse {
  content: WishData[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
