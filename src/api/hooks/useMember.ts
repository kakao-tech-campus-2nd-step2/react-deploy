import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchMembers } from '@/api/services/admin';
import { MembersRequestParams } from '@/api/services/admin/types';

type MembersParams = Pick<MembersRequestParams, 'size'> & {
  initPageToken?: string;
};

export const useMember = ({ size = 10, initPageToken }: MembersParams) => {
  const { data, status, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['products', size, initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      fetchMembers({ page: pageParam }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });

  const members = data?.pages.flatMap((page) => page.members);

  return {
    members,
    status,
    error,
    fetchNextPage,
    hasNextPage,
  };
};
