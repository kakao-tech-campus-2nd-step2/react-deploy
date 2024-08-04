import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};

export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;

  const { data: detail } = useGetProductDetail({ productId: id.toString() });
  const totalPrice = detail.price * count;

  const { handleSubmit, getValues } = useOrderFormContext();

  const onSubmit = async () => {
    const formData = getValues();

    const orderData = {
      productId: id,
      optionId: 1, // 형식을 맞추기 위함
      quantity: count,
      hasCashReceipt: formData.hasCashReceipt,
      cashReceiptType: formData.cashReceiptType,
      cashReceiptNumber: formData.cashReceiptNumber,
      message: formData.messageCardTextMessage,
    };
    console.log('주문 데이터:', orderData); // 여기서 주문 데이터 출력
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('주문 생성 실패');
      }

      const result = await response.json();
      console.log('주문 성공:', result);
      alert('주문 성공!');
      // 주문 성공 후 처리 로직 추가
    } catch (error) {
      console.error('주문 오류:', error);
    }
  };

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <CashReceiptFields />
      <Divider color="#ededed" />
      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{totalPrice}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="button" onClick={handleSubmit(onSubmit)}>
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
