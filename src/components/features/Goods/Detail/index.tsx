import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

import { GoodsDetailHeader } from './Header';

type Props = {
  productId: string;
};

export const GoodsDetail = ({ productId }: Props) => {
  const { data: detail, isLoading, error } = useGetProductDetail({ productId });

  if (isLoading) return <p>Loading...</p>;
  if (error || !detail) return <p>Error loading product details</p>; // detail이 undefined인 경우도 처리

  return (
    <Wrapper>
      {detail && (
        <>
          <GoodsDetailHeader productId={productId} />
          {/* 추가적인 상세 정보 렌더링 */}
          <InfoWrapper>
            <Description>{detail.description}</Description>
          </InfoWrapper>
        </>
      )}
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

const InfoWrapper = styled.div`
  margin-top: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  color: #666;
`;
