import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPoint } from '@utils/query';
import { QueryKeys } from '@constants/QueryKeys.ts';

function usePoint() {
  const {
    data: point,
  } = useSuspenseQuery({
    queryFn: fetchPoint,
    queryKey: [QueryKeys.POINT],
  });

  return { point };
}

export default usePoint;
