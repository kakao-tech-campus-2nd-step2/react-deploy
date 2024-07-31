import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductOptionResponse } from '@internalTypes/responseTypes';
import { ProductOptionsRequest } from '@internalTypes/requestTypes';
import { AxiosError } from 'axios';
import axiosInstance from '@apis/instance';
import { PRODUCTS_PATHS } from '@apis/path';

export const getProductsOptions = async (params: ProductOptionsRequest): Promise<ProductOptionResponse> => {
  const { productId } = params;
  const res = await axiosInstance.get<ProductOptionResponse>(PRODUCTS_PATHS.PRODUCTS_OPTIONS(productId));
  return res.data;
};

export const useGetProductsOption = ({
  productId,
}: ProductOptionsRequest): UseQueryResult<ProductOptionResponse, AxiosError> =>
  useQuery<ProductOptionResponse, AxiosError>({
    queryKey: ['productOption', productId],
    queryFn: () => getProductsOptions({ productId }),
  });
