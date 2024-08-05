import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { BASE_URL, fetchInstance } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';
import type { OrderFormData, OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};
export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;

  const { data: detail } = useGetProductDetail({ productId: id.toString() });
  const initTotalPrice = detail.price * count;
  const [totalPrice, setTotalPrice] = useState(initTotalPrice);
  const { handleSubmit, getValues, register, watch } = useOrderFormContext();

  const point = watch("point", 0);

  useEffect(() => {
    setTotalPrice(initTotalPrice - (point ?? 0)); // 포인트가 undefined일 경우 0으로 처리
  }, [point, initTotalPrice]);

  const onSubmit = async () => {
    const formData = getValues();

    const orderData: OrderFormData = {
      productId: id,
      optionId: 1, // 임시 데이터
      productQuantity: count,
      hasCashReceipt: formData.hasCashReceipt,
      cashReceiptType: formData.cashReceiptType,
      cashReceiptNumber: formData.cashReceiptNumber,
      messageCardTextMessage: formData.messageCardTextMessage,
      point: formData.point
    };

    try {
      const response = await fetchInstance.post(`${BASE_URL}/api/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const earnedPoints = totalPrice * 0.05;
        console.log("주문 완료!", response.data);
        alert(`주문 성공! 적립 포인트: ${earnedPoints.toFixed(2)}점`);
      } 
      
      else {
        console.error("주문 실패:", response.data);
        alert("주문에 실패했습니다.");
      }
    } catch (error) {
      console.error("주문 오류:", error);
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
      <ItemWrapper>
        <LabelText>사용할 포인트</LabelText>
        <InputWrapper>
          <StyledInput type="number" {...register("point", { valueAsNumber: true })} />
        </InputWrapper>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit" data-testid="submit-button" onClick={handleSubmit(onSubmit)}>{totalPrice}원 결제하기</Button>
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

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;