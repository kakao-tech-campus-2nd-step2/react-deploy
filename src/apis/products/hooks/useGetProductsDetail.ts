import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductDetailRequest } from '@internalTypes/requestTypes';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import { AxiosError } from 'axios';
import axiosInstance from '@apis/instance';
import { PRODUCTS_PATHS } from '@apis/path';

const getProductsDetail = async (params: ProductDetailRequest): Promise<ProductDetailResponse> => {
  const res = await axiosInstance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_DETAIL(params.productId));
  return res.data;
};

export const useGetProductsDetail = ({
  productId,
}: ProductDetailRequest): UseQueryResult<ProductDetailResponse, AxiosError> =>
  useQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });
