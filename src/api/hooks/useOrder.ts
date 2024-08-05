import { useState } from 'react';
import { fetchInstance, BASE_URL } from '../instance';

type OrderParams = {
  optionId: number;
  quantity: number;
  message: string;
};

type OrderResponse = {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
};

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  const createOrder = async (params: OrderParams, token: string) => {
    setIsLoading(true);
    setError(null);
    console.log(params);
    try {
      const response = await fetchInstance.post<OrderResponse>(
        `${BASE_URL}/api/orders`,
        params,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization 헤더 추가
          },
        }
      );
      console.log(response);
      setOrder(response.data);
      return response.data;
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, order, isLoading, error };
};
