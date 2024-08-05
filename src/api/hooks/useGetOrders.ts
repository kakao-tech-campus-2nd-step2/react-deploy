import { useQuery } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

export interface Order {
  id: number;
  productId: number;
  name: string;
  imageUrl: string;
  optionId: number;
  count: number;
  price: number;
  orderDateTime: string;
  message: string;
  success: boolean;
}

export interface OrderResponse {
  content: Order[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
}

interface FetchOrdersParams {
  page?: number;
  size?: number;
  sort?: string;
}

const fetchOrders = async ({
  page = 0,
  size = 10,
  sort = 'id,desc',
}: FetchOrdersParams): Promise<OrderResponse> => {
  const response = await fetchInstance.get<OrderResponse>(ApiPath.orders.root, {
    params: { page, size, sort },
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });

  return response.data;
};

export const useGetOrders = ({ page, size, sort }: FetchOrdersParams) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['orders', page, size, sort],
    queryFn: () => fetchOrders({ page, size, sort }),
  });
};
