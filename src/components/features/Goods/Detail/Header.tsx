import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import type { ProductDetailRequestParams } from '@/api/hooks/useGetProductDetail';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { breakpoints } from '@/styles/variants';

type Props = ProductDetailRequestParams;

export const GoodsDetailHeader = ({ productId }: Props) => {
  const { data: productDetail } = useGetProductDetail({ productId });
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorited(!isFavorited);
    alert(isFavorited ? '관심 등록 해제' : '관심 등록 완료');
  };

  return (
    <Wrapper>
      <ProductImage src={productDetail.imageUrl} alt={productDetail.name} />
      <InfoWrapper>
        <Title>{productDetail.name}</Title>
        <Price>{productDetail.price}원</Price>
        <Divider color="#f5f5f5" />
        <Notice>카톡 친구가 아니어도 선물 코드로 선물 할 수 있어요!</Notice>
        <Divider color="#f5f5f5" />
        <FavoriteButton isFavorited={isFavorited} onClick={handleFavoriteToggle}>
          {isFavorited ? '❤️ 관심 등록 해제' : '🖤 관심 등록'}
        </FavoriteButton>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.sm}) {
    flex-direction: row;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 450px;
`;

const InfoWrapper = styled.div`
  width: 100%;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding-left: 24px;
  }
`;

const Title = styled.h2`
  padding-top: 24px;
  font-size: 24px;
  line-height: 33px;
  color: #111;
  font-weight: 400;
  word-break: break-all;
`;

const Price = styled.p`
  width: 100%;
  min-height: 120px;
  padding-top: 16px;
  font-size: 30px;
  font-weight: 400;
  line-height: 52px;
  color: #222;
`;

const Notice = styled.p`
  padding: 24px 12px;
  font-size: 14px;
  font-weight: 700;
  color: #111;
`;

const FavoriteButton = styled.button<{ isFavorited: boolean }>`
  margin-top: 16px;
  padding: 8px 16px;
  background-color: ${({ isFavorited }) => (isFavorited ? '#ffdddd' : '#f0f0f0')};
  color: ${({ isFavorited }) => (isFavorited ? 'red' : '#555')};
  border-radius: 4px;
  border: 1px solid ${({ isFavorited }) => (isFavorited ? 'red' : '#d2d2d2')};
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border 0.3s ease;

  &:hover {
    background-color: ${({ isFavorited }) => (isFavorited ? '#ffcccc' : '#e0e0e0')};
  }
`;
