import { Divider } from '@chakra-ui/react';
import { useEffect } from 'react';
import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';
import { useGetMyPoint } from '@/api/hooks/useGetMyPoint';

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

type Props = {
  orderHistory: OrderHistory;
  totalPrice: number;
  usePoint: number;
  setUsePoint: (value: number) => void;
  setTotalPrice: (value: number) => void;
};
export const OrderFormOrderInfo = ({ orderHistory, totalPrice, usePoint, setUsePoint, setTotalPrice }: Props) => {
  const { id, count } = orderHistory;
  const { myPoint } = useGetMyPoint();
  const { data: detail } = useGetProductDetail({ productId: id.toString() });

  useEffect(() => {
    if (detail) {
      setTotalPrice(detail.price * count);
    }
  }, [detail, count]);

  const handleUsePointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const value = parseInt(event.target.value, 10);
      setUsePoint(value);

      if (detail) {
        const calculatedTotalPrice = detail.price * count - value;
        setTotalPrice(Math.max(calculatedTotalPrice, 0));
      }
    }
  };

  if (!detail) return <></>

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <CashReceiptFields />
      <Divider color="#ededed" />
      <PointWrapper>
        <LabelText>포인트 사용</LabelText>
        <PointText>총 {myPoint ? myPoint.point : '0'}원</PointText>
        <div style={{ height: '16px' }} />
        <NumberInput
          defaultValue={0}
          min={0}
          max={myPoint ? (myPoint.point > totalPrice ? totalPrice : myPoint.point) : 0}
          keepWithinRange={false}
          clampValueOnBlur={false}
        >
          <NumberInputField value={usePoint} onChange={(value) => handleUsePointChange(value)} />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </PointWrapper>
      <Divider color="#ededed" />
      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{totalPrice}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit">{totalPrice}원 결제하기</Button>
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

const PointWrapper = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const PointText = styled.div`
  font-size: 18px;
`