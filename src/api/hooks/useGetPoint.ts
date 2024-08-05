import { ApiPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../instance';

interface PointResponseParams {
  point: number;
}

export const useGetPoint = async () => {
  const response = await fetchInstance.get<PointResponseParams>(ApiPath.orders.price, {
    headers: {
      Authorization: `Bearer ${authSessionStorage.get()}`,
    },
  });

  return response.data;
};
