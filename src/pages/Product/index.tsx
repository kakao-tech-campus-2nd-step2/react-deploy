import React from 'react';
import styled from '@emotion/styled';
import Layout from '@features/Layout';
import { CenteredContainer } from '@components/common';
import ProductInfo from '@features/Product/ProductInfo';
import { ROUTE_PATH } from '@routes/path';
import useRedirectIfNoParam from '@hooks/useRedirectIfNoParam';
import ProductOrder from '@features/Product/ProductOrder';

export default function Product() {
  useRedirectIfNoParam('productId', ROUTE_PATH.HOME);

  return (
    <Layout>
      <CenteredContainer maxWidth="lg">
        <InnerContainer>
          <ProductInfo />
          <ProductOrder />
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
