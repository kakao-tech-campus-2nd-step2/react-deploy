import { Divider, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
  usedPoints: number;
  onPointsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  remainingPoints: number;
};

export const OrderFormOrderInfo = ({
  orderHistory,
  usedPoints,
  onPointsChange,
  remainingPoints,
}: Props) => {
  const { id, count } = orderHistory;

  const { data: detail } = useGetProductDetail({ productId: id.toString() });
  const totalPrice = detail.price * count;

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <CashReceiptFields />
      <Divider color="#ededed" />
      <ItemWrapper>
        <LabelText>잔여 포인트: {remainingPoints}원</LabelText>
        <Input
          type="number"
          value={usedPoints === 0 ? '' : usedPoints}
          onChange={onPointsChange}
          placeholder="사용할 포인트"
        />
      </ItemWrapper>
      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{totalPrice - usedPoints}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit">{totalPrice - usedPoints}원 결제하기</Button>
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
