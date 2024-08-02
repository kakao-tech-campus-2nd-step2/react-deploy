import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useBackend } from '@/provider/Auth/Backend';
import type { ProductData } from '@/types';

import { fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const getProductDetailPath = (productId: string) => `/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams, baseURL: string) => {
  try {
    const url = `${baseURL}${getProductDetailPath(params.productId)}`;
    console.log(`Requesting product detail from ${url}`);
    const response = await fetchInstance(baseURL).get<GoodsDetailResponseData>(url);
    console.log('Product detail response:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching product detail:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error message:', error.message);
      console.error('Axios error response:', error.response);
    }
    throw error;
  }
};

export const useGetProductDetail = ({ productId }: Props) => {
  const { backendUrl } = useBackend();

  return useSuspenseQuery({
    queryKey: [getProductDetailPath(productId)],
    queryFn: () => getProductDetail({ productId }, backendUrl),
  });
};
