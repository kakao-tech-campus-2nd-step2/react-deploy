import {
  ProductData,
  CategoryData, WishData, ProductOption,
} from '@/dto';

export type CategoryResponse = CategoryData[];

export interface PagedProductReponse {
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

export interface CategoryProductsResponse extends PagedProductReponse {
  content: ProductData[];
}

export interface WishedProductsResponse extends PagedProductReponse {
  content: WishData[];
}

export interface OrderedProductsResponse extends PagedProductReponse {
  content: ProductData[];
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
