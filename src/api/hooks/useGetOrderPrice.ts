import type { UseQueryResult } from '@tanstack/react-query';

import { useAxiosQuery } from '@/api';
import type { GetOrderPriceResponseBody } from '@/api/type';
type RequestParams = {
  optionId: string;
  quantity: number;
  productId: string;
};

export function getOrderPricePath({ optionId, quantity, productId }: RequestParams): string {
  return `/api/orders/price?optionId=${optionId}&quantity=${quantity}&productId=${productId}`;
}

function useGetOrderPrice({
  optionId,
  quantity,
  productId,
}: RequestParams): UseQueryResult<GetOrderPriceResponseBody> {
  return useAxiosQuery<GetOrderPriceResponseBody>(
    {
      method: 'GET',
      url: getOrderPricePath({ optionId, quantity, productId }),
    },
    ['orderPrice', optionId, quantity.toString(), productId],
  );
}

export default useGetOrderPrice;
