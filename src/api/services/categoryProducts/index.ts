import { BACKEND_API } from '@/api/config';

import {
  ProductsRequestParams,
  ProductsResponse,
  ProductsResponseRaw,
} from './types';

export const fetchCategoryProducts = async (
  params: ProductsRequestParams
): Promise<ProductsResponse> => {
  const response = await BACKEND_API.get<ProductsResponseRaw>(
    getProductsPath(params)
  );
  const { data } = response;

  return {
    products: data.content,
    nextPageToken:
      data.page !== data.totalPages - 1
        ? (data.page + 1).toString()
        : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

const getProductsPath = ({
  categoryId,
  pageToken,
  maxResults,
}: ProductsRequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId.toString());
  params.append('sort', 'name,asc');
  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `/api/products?${params.toString()}`;
};
