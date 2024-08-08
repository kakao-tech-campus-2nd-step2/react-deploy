import type { UseAxiosQueryWithPageResult } from '@/api';
import { useAxiosQueryWithPage } from '@/api';
import type { GetCategoriesProductsResponseBody } from '@/api/type';

type RequestParams = {
  categoryId: string;
  size?: number;
  page?: number;
  sort?: string;
};

export function getProductsPath({ categoryId, size, sort = 'id,desc' }: RequestParams): string {
  return `/api/products?categoryId=${categoryId}` + (size ? `&size=${size}` : '') + `&sort=${sort}`;
}

function useGetProducts({
  categoryId,
  size = 20,
}: RequestParams): UseAxiosQueryWithPageResult<GetCategoriesProductsResponseBody> {
  return useAxiosQueryWithPage<GetCategoriesProductsResponseBody>(
    {
      method: 'GET',
      url: getProductsPath({ categoryId, size }),
    },
    ['products', categoryId],
    (lastPage) => (!lastPage.last ? (lastPage.number + 1).toString() : undefined),
  );
}

export default useGetProducts;
