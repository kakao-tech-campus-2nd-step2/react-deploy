import React from 'react';
import styled from '@emotion/styled';
import { Image } from '@chakra-ui/react';
import { useGetProductsDetail } from '@apis/products/hooks/useGetProductsDetail';

const IMAGE_SIZE = 86;

export default function Gift() {
  const data = sessionStorage.getItem('orderHistory');
  const parsedData = data ? JSON.parse(data) : null;
  const productId = parsedData?.productId;
  const quantity = parsedData?.quantity;

  const { data: productDetailData } = useGetProductsDetail({ productId });

  return (
    <GiftContainer>
      <Image src={productDetailData?.imageUrl} maxW={IMAGE_SIZE} mr={4} />
      <div>
        <GiftName>{productDetailData?.category.name}</GiftName>
        <GiftInfo>
          {productDetailData?.name} X {quantity}개
        </GiftInfo>
      </div>
    </GiftContainer>
  );
}

const GiftContainer = styled.div`
  display: flex;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid rgb(237, 237, 237);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 4px 8px;
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const GiftName = styled.p`
  font-size: 13px;
  color: rgb(136, 136, 136);
`;

const GiftInfo = styled.p`
  font-size: 14px;
`;
