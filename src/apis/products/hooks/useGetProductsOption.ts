import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductOptionResponse } from '@internalTypes/responseTypes';
import { ProductOptionsRequest } from '@internalTypes/requestTypes';
import initInstance from '@apis/instance';
import { AxiosError } from 'axios';
import { PRODUCTS_PATHS } from '@apis/path';

const optionInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

export const getProductsOptions = async (params: ProductOptionsRequest): Promise<ProductOptionResponse> => {
  const { productId } = params;
  const res = await optionInstance.get<ProductOptionResponse>(PRODUCTS_PATHS.PRODUCTS_OPTIONS(productId));
  return res.data;
};

export const useGetProductsOption = ({
  productId,
}: ProductOptionsRequest): UseQueryResult<ProductOptionResponse, AxiosError> =>
  useQuery<ProductOptionResponse, AxiosError>({
    queryKey: ['productOption', productId],
    queryFn: () => getProductsOptions({ productId }),
  });
