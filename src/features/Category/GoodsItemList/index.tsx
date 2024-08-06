import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { GoodsItem, Grid, CenteredContainer, StatusHandler } from '@components/common';
import { Link, useParams } from 'react-router-dom';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { getDynamicPath } from '@utils/getDynamicPath';
import { ROUTE_PATH } from '@routes/path';
import { useGetProducts } from '@apis/products/hooks/useGetProducts';

const GRID_GAP = 14;
const GRID_COLUMNS = 4;
const MAX_SIZE = 10;

export default function GoodsItemList() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const {
    data: products,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetProducts({
    categoryId: Number(categoryId),
    size: MAX_SIZE,
    sort: 'name,asc',
  });
  const ref = useInfiniteScroll({ condition: hasNextPage && !isFetchingNextPage, fetchNextPage });

  const isEmpty = products?.pages[0].content.length === 0;

  return (
    <GoodsItemListContainer>
      <CenteredContainer maxWidth="md">
        <StatusHandler
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
        >
          <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
            {products?.pages[0].content.map((product) => (
              <Link key={product.id} to={getDynamicPath(ROUTE_PATH.PRODUCT, { productId: product.id.toString() })}>
                <GoodsItem
                  imageSrc={product.imageUrl}
                  amount={product.price}
                  subtitle={product.category.name}
                  title={product.name}
                />
              </Link>
            ))}
            {hasNextPage && <div ref={ref} />}
          </Grid>
        </StatusHandler>
      </CenteredContainer>
    </GoodsItemListContainer>
  );
}

const GoodsItemListContainer = styled.section`
  padding-top: 40px;
  padding-bottom: 360px;
`;
