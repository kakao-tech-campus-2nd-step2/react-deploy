import { ProductData, MessageCardTemplateData, ThemeData, CategoryData } from './dataTypes';

export type CategoriesResponse = CategoryData[];

export interface RankingProductsResponse {
  products: ProductData[];
}

export interface WishProduct {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export interface OrderResponse {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
}

export interface Wish {
  wishId: number;
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
  category: Omit<CategoryData, 'color'>;
}

export interface GetWishesResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Wish[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
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

export interface ProductOption {
  id: number;
  name: string;
  quantity: number;
}

export type ProductOptionResponse = ProductOption[];

export interface MessageCardTemplatesResponse {
  templates: MessageCardTemplateData[];
}

export interface MyAccountInfoResponse {
  id: number;
  name: string;
  birthday?: string;
  profileImageURL: string;
  point: number;
}

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
