import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchMyPoint } from '@/api/services/point/fetchMyPoint';

export const useMyPoint = () => {
  return useSuspenseQuery({
    queryKey: ['point'],
    queryFn: () => fetchMyPoint(),
    gcTime: 0,
    staleTime: 0,
  });
};
