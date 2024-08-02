import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetPoint } from '@/api/hooks/useGetPoint';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};
export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;

  const { data: product } = useGetProductDetail({ productId: id.toString() });
  const { data: pointData } = useGetPoint();
  const originalPrice = product.price * count;
  let usedPoint;
  if (pointData) {
    usedPoint = product.price > pointData.point ? pointData.point : product.price;
  } else {
    usedPoint = 0;
  }
  const totalPrice = originalPrice - usedPoint;

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <CashReceiptFields />
      <Divider color="#ededed" />
      <ItemWrapper>
        <LabelText style={{ fontWeight: 'normal' }}>전체 상품 금액</LabelText>
        <HeadingText style={{ fontWeight: 'normal' }}>{originalPrice}원</HeadingText>
      </ItemWrapper>
      <ItemWrapper>
        <LabelText style={{ fontWeight: 'normal' }}>포인트 사용</LabelText>
        <HeadingText style={{ fontWeight: 'normal' }}>- {usedPoint}원</HeadingText>
      </ItemWrapper>
      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{totalPrice}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit" aria-label="submitBtn">
        {totalPrice}원 결제하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 16px;
`;

const Title = styled.h6`
  padding: 24px 0 20px;
`;

const ItemWrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
