import { useCallback, useRef } from 'react';
import Container from '@components/atoms/container/Container';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import { Text } from '@chakra-ui/react';
import ProductSkeletonGrid from '@components/molecules/skeleton/ProductSkeletonGrid';
import useFetchProducts from '@hooks/useFetchProducts';
import Button from '@components/atoms/button/Button';
import ProductDisplaySection from '@components/organisms/product/ProductDisplaySection';
import ErrorBoundary from '@components/atoms/boundary/ErrorBoundary';
import { generateRandomId } from '@/utils';
import { ProductData } from '@/dto';

const MAX_RESULTS_PER_PAGE = 10;

function OrderHistorySection() {
  const orderSectionId = useRef(generateRandomId());

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchProducts({
    productType: 'ordered',
    sort: 'name, asc',
    itemsPerPage: MAX_RESULTS_PER_PAGE,
  });

  const handleLoadClick = useCallback(() => {
    if (!hasNextPage) return;

    fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  return (
    <Container elementSize="full-width" maxWidth={MAX_CONTENT_WIDTH} flexDirection="column">
      <Text fontSize="25px" fontWeight="bold" paddingBottom="10px">주문 내역</Text>
      <ErrorBoundary>
        {data?.pages?.map((page, index) => {
          const key = `${orderSectionId}-${index}`;

          return (
            <ProductDisplaySection
              products={page.content as ProductData[]}
              maxColumns={5}
              minColumns={2}
              key={key}
            />
          );
        })}
      </ErrorBoundary>
      {isFetchingNextPage ? (
        <ProductSkeletonGrid columnsDefault={5} itemCount={5} columnsSm={2} />
      ) : null}
      {hasNextPage ? (
        <Container elementSize="full-width" padding="20px 0" flexDirection="column">
          <Button theme="kakao" elementSize="big" text="더 불러오기" onClick={handleLoadClick} />
        </Container>
      ) : null}
    </Container>
  );
}

export default OrderHistorySection;
