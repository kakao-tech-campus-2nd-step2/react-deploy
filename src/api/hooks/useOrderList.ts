import { useState, useEffect } from 'react';
import { fetchInstance, BASE_URL } from '../instance';
import { useAuth } from '@/provider/Auth';

type Order = {
  id: number;
  optionId: number;
  quantity: number;
  orderDateTime: string;
  message: string;
};

type UseOrderListParams = {
  page: number;
  size: number;
  sort?: string;
};

export const useOrderList = ({ page, size, sort = 'orderDateTime,desc' }: UseOrderListParams) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const authInfo = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);


      if (!authInfo?.token) {
        setError(new Error('인증 토큰이 없습니다.'));
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetchInstance.get<Order[]>(
          `/api/orders?page=${page}&size=${size}&sort=${sort}`,
          {
            headers: {
              Authorization: `Bearer ${authInfo.token}`, // 인증 토큰 추가
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [page, size, sort]);

  return { orders, loading, error };
};
