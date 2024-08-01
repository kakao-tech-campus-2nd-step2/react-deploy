import { useCallback, useRef } from 'react';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { Text } from '@chakra-ui/react';
import ProductSkeletonGrid from '@components/molecules/skeleton/ProductSkeletonGrid';
import WishesContent from '@components/organisms/mypage/WishesContent';
import useFetchProducts from '@hooks/useFetchProducts';
import Button from '@components/atoms/button/Button';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';
import { generateRandomId } from '@/utils';
import { WishData } from '@/dto';

const MAX_RESULTS_PER_PAGE = 10;

function WishesSection() {
  const wishSectionId = useRef(generateRandomId());

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useFetchProducts({
    productType: 'wished',
    sort: 'name,asc',
    itemsPerPage: MAX_RESULTS_PER_PAGE,
  });

  const handleLoadClick = useCallback(() => {
    if (!hasNextPage) return;

    fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  return (
    <Container elementSize="full-width" maxWidth={MAX_CONTENT_WIDTH} flexDirection="column">
      <Text fontSize="25px" fontWeight="bold" paddingBottom="10px">관심 상품 목록</Text>
      <ErrorBoundary>
        {data?.pages?.map((page, index) => {
          const key = `${wishSectionId}-${index}`;

          return (
            <WishesContent
              wishes={page.content as WishData[]}
              maxColumns={5}
              minColumns={5}
              key={key}
              refetch={refetch}
            />
          );
        })}
        {isFetchingNextPage ? (
          <ProductSkeletonGrid columnsDefault={5} itemCount={5} columnsSm={2} />
        ) : null}
      </ErrorBoundary>
      {hasNextPage ? (
        <Container elementSize="full-width" padding="20px 0" flexDirection="column">
          <Button theme="kakao" elementSize="big" text="더 불러오기" onClick={handleLoadClick} />
        </Container>
      ) : null}
    </Container>
  );
}

export default WishesSection;
