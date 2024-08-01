import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProductDetailRequest } from '@internalTypes/requestTypes';
import { ProductDetailResponse } from '@internalTypes/responseTypes';
import initInstance from '@apis/instance';
import { AxiosError } from 'axios';
import { PRODUCTS_PATHS } from '@apis/path';

const productInstance = initInstance(process.env.REACT_APP_EUN_KYOUNG_BASE_URL);

const getProductsDetail = async (params: ProductDetailRequest): Promise<ProductDetailResponse> => {
  const res = await productInstance.get<ProductDetailResponse>(PRODUCTS_PATHS.PRODUCTS_DETAIL(params.productId));
  return res.data;
};

export const useGetProductsDetail = ({
  productId,
}: ProductDetailRequest): UseQueryResult<ProductDetailResponse, AxiosError> =>
  useQuery<ProductDetailResponse, AxiosError>({
    queryKey: ['productDetail', productId],
    queryFn: () => getProductsDetail({ productId }),
  });
