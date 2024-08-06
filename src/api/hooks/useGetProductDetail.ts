import { useQuery } from '@tanstack/react-query';
import type { ProductData } from '@/types';
import { BASE_URL, fetchInstance } from '../instance';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = {
  products: ProductData;
};

export const getProductDetailPath = (productId: string) => `${BASE_URL}/api/products/${productId}`;

export const getProductDetail = async (params: ProductDetailRequestParams) => {
  const url = getProductDetailPath(params.productId);
  const response = await fetchInstance.get<GoodsDetailResponseData>(url);

  return response.data.products;
};

export const useGetProductDetail = ({ productId }: Props) => {
  return useQuery({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      return getProductDetail({ productId });
    },
  });
};
