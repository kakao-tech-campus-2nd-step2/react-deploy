import styled from '@emotion/styled';

import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

import { GoodsDetailHeader } from './Header';

type Props = ProductDetailRequestParams;

export const GoodsDetail = ({ product_id }: Props) => {
  return (
    <Wrapper>
      <GoodsDetailHeader product_id={product_id} />
    </Wrapper>
  );
};

const Wrapper = styled.article`
  width: 100%;
  padding: 16px 16px 60px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px 32px 80px;
  }
`;
