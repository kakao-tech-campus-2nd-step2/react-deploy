import type { ProductData, ProductOptionsData } from '@/types/product';

export type ProductDetailRequestParams = {
  productId: string;
};

export type ProductDetailProps = ProductDetailRequestParams;

export type ProductOptionsResponseData = ProductOptionsData[];

export type GoodsDetailResponseData = ProductData;

export type ProductsParams = Pick<RequestParams, 'maxResults' | 'categoryId'> & {
  initPageToken?: string;
};

export type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
};

export type ProductsResponseData = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

export type ProductsResponseRawData = {
  content: ProductData[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};
