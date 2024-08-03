import React from 'react';
import styled from '@emotion/styled';
import Layout from '@features/Layout';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@features/Product/ProductInfo';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';
import ProductOrder from '@features/Product/ProductOrder';
import { useGetProductsDetail } from '@/apis/products/hooks/useGetProductsDetail';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { productId } = useParams<{ productId: string }>();
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);
  const { data } = useGetProductsDetail({ productId });

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo imageUrl={data?.imageUrl} name={data?.name} price={data?.price} />
          <ProductOrder price={data?.price} />
        </InnerContainer>
      </CenteredContainer>
    </Layout>
  );
}

const InnerContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: space-between;
  padding-top: 100px;
`;
