import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';

type RequestParams = {
  productId: number;
};

type ProductsResponseData = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  categoryId: number;
};

export const getProductsPath = ({ productId }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('productId', productId.toString());

  return `${BASE_URL}/api/products/${productId}`;
};

export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get(getProductsPath(params));
  //   const data = response.data;
  return response.data;
};

export const useGetProducts = ({ productId }: RequestParams) => {
  return useQuery({
    queryKey: [getProductsPath({ productId })],
    queryFn: () => getProducts({ productId }),
  });
};

// export const useGetProducts = ({
//   productId,
// }: RequestParams): UseQueryResult<ProductsResponseData> => {
//   return useQuery({
//     queryKey: [getProductsPath({ productId })],
//     queryFn: () => getProducts({ productId }),
//   });
// };
