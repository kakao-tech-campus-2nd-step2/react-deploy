import { Container } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import useGetWishes from '@/api/hooks/useGetWishes';
import type { WishesData } from '@/api/type';
import { Grid } from '@/components/common/layouts/Grid';
import ListMapper from '@/components/common/ListMapper';
import Loading from '@/components/common/Loading';
import WishItems from '@/components/features/MyAccount/WishItems';

const WishesTab = () => {
  const { ref, inView } = useInView();

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useGetWishes({});
  const flattenWishsList = data?.pages.map((page) => page?.content || page || []).flat();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Container>
      <Loading isLoading={isLoading} error={isError}>
        <ListMapper<WishesData>
          items={flattenWishsList}
          ItemComponent={WishItems}
          Wrapper={Grid}
          wrapperProps={{
            columns: {
              initial: 2,
              md: 4,
            },
            gap: 16,
          }}
        />
        <div ref={ref} />
      </Loading>
    </Container>
  );
};

export default WishesTab;
