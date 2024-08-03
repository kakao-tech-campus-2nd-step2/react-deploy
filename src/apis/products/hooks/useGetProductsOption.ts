import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductOptionResponse } from '@internalTypes/responseTypes';
import { ProductOptionsRequest } from '@internalTypes/requestTypes';
import { initInstance } from '@apis/instance';
import { AxiosError } from 'axios';
import { PRODUCTS_PATHS } from '@apis/path';
import { useAPI } from '@/context/api/useAPI';

export const getProductsOptions = async (
  params: ProductOptionsRequest,
  baseURL: string,
): Promise<ProductOptionResponse> => {
  const instance = initInstance(baseURL);
  const { productId } = params;
  const res = await instance.get<ProductOptionResponse>(PRODUCTS_PATHS.PRODUCTS_OPTIONS(productId));
  return res.data;
};

export const useGetProductsOption = ({
  productId,
}: ProductOptionsRequest): UseQueryResult<ProductOptionResponse, AxiosError> => {
  const { baseURL } = useAPI();

  return useQuery<ProductOptionResponse, AxiosError>({
    queryKey: ['productOption', productId],
    queryFn: () => getProductsOptions({ productId }, baseURL),
  });
};
