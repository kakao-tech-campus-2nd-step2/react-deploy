import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductDetailRequest } from '@internalTypes/requestTypes';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import { initInstance } from '@apis/instance';
import { AxiosError } from 'axios';
import { PRODUCTS_PATHS } from '@apis/path';
import { useAPI } from '@/context/api/useAPI';

const getProductsDetail = async (params: ProductDetailRequest, baseURL: string): Promise<ProductDetailResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_DETAIL(params.productId));
  return res.data;
};

export const useGetProductsDetail = ({
  productId,
}: ProductDetailRequest): UseQueryResult<ProductDetailResponse, AxiosError> => {
  const { baseURL } = useAPI();

  return useQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }, baseURL),
  });
};
