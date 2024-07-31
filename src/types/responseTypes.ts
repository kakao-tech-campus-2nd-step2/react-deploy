import { ProductData, MessageCardTemplateData, ThemeData, CategoryData } from './dataTypes';

export type CategoriesResponse = CategoryData[];

// export interface RankingProductsResponse {
//   products: ProductData[];
// }

export interface WishProduct {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface GetWishesResponse {
  content: WishProduct[];
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

export interface AddWishResponse {
  id: number;
  productId: number;
}

export interface ThemesResponse {
  themes: ThemeData[];
}

export interface ProductDetailResponse {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: {
    id: number;
    name: string;
    color: string;
    imageUrl: string;
    description: string;
  };
}

export interface ProductOptionResponse {
  options: {
    giftOrderLimit: number;
    hasOption: boolean;
    names: string[];
    options: string[];
    productId: number;
    productName: string;
    productPrice: number;
  };
}

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

// export interface MyAccountInfoResponse {
//   id: number;
//   name: string;
//   birthday?: string;
//   profileImageURL: string;
//   point: number;
// }

export interface MyAccountWishProductsResponse {
  products: ProductData[];
  nextPageToken: string | null;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

// Member
export interface MemberResponse {
  access_token: string;
}

// products
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
}

export interface GetProductsResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ProductData[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}
