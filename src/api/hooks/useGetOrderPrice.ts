import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';

import { fetchInstance } from '../instance';

interface OrderPriceRequestParams {
  optionId: number;
  quantity: number;
  productId: number;
}

interface OrderPriceResponseParams {
  price: number;
}

const getOrderPrice = async (
  params: OrderPriceRequestParams,
): Promise<OrderPriceResponseParams> => {
  const response = await fetchInstance.get<OrderPriceResponseParams>(ApiPath.orders.price, {
    params,
  });
  return response.data;
};

export const useGetOrderPrice = (params: OrderPriceRequestParams) => {
  return useQuery<OrderPriceResponseParams, Error>({
    queryKey: ['orderPrice', params],
    queryFn: () => getOrderPrice(params),
  });
};
