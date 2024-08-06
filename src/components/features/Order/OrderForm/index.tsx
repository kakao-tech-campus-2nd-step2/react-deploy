import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
//import { useQueryClient } from 'react-query';
import { usePoint } from '@/api/hooks/usePoint';
import { BASE_URL, fetchInstance } from '@/api/instance';
import { Spacing } from '@/components/common/layouts/Spacing';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import type { OrderFormData, OrderHistory } from '@/types';

import { HEADER_HEIGHT } from '../../Layout/Header';
import { GoodsInfo } from './GoodsInfo';
import { OrderFormMessageCard } from './MessageCard';
import { OrderFormOrderInfo } from './OrderInfo';

type Props = {
  orderHistory: OrderHistory;
};

export const OrderForm = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const [usePoints, setUsePoints] = useState(false);
  const { data: userPoints = 0, refetch } = usePoint(); // 포인트 데이터 가져오기

  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: id,
      productQuantity: count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      messageCardTextMessage: '',
      cashReceiptNumber: '',
      usePoints: false,
    },
  });
  const { handleSubmit } = methods;
  const { data: detail } = useGetProductDetail({ productId: id.toString() }); // 제품 세부 정보 가져오기
  const [countAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail?.price * Number(countAsString) || 0; // 제품 세부 정보에서 가격 가져오기
  }, [detail, countAsString]);

  //const productQuantity = watch('productQuantity');
  //const productPrice = 10000; // 예시로 단가 10000원으로 설정
  //const totalPrice = productQuantity * productPrice;
  const discount = usePoints ? Math.min(userPoints, totalPrice * 0.1) : 0; // 포인트 사용 금액 계산
  const finalPrice = totalPrice - discount;

  const handleForm: SubmitHandler<OrderFormData> = (values) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    if (usePoints) {
      // 포인트 차감 로직
      fetchInstance.post(`${BASE_URL}/api/points`, { pointsToAdd: -discount }).then(() => {
        refetch(); // 포인트를 차감한 후 포인트 데이터를 다시 가져옵니다.
      });
    }

    console.log('values', values);
    alert('주문이 완료되었습니다.');
  };

  const preventEnterKeySubmission = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLFormElement;
    if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) {
      e.preventDefault();
    }
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(handleForm)} onKeyDown={preventEnterKeySubmission}>
        <SplitLayout sidebar={<OrderFormOrderInfo orderHistory={orderHistory} />}>
          <Wrapper>
            <OrderFormMessageCard />
            <Spacing height={8} backgroundColor="#ededed" />
            <GoodsInfo orderHistory={orderHistory} />
            <Spacing height={8} />
            <label>
              <input
                type="checkbox"
                checked={usePoints}
                onChange={(e) => setUsePoints(e.target.checked)}
              />
              포인트 사용 (사용 가능 포인트: {userPoints})
            </label>
            <Spacing height={8} />
            <div>
              <p>총 결제 금액: {totalPrice}원</p>
              <p>포인트 차감: {discount}원</p>
              <p>최종 결제 금액: {finalPrice}원</p>
            </div>
          </Wrapper>
        </SplitLayout>
      </form>
    </FormProvider>
  );
};

const validateOrderForm = (values: OrderFormData): { errorMessage?: string; isValid: boolean } => {
  if (values.hasCashReceipt) {
    if (!values.cashReceiptNumber) {
      return {
        errorMessage: '현금영수증 번호를 입력해주세요.',
        isValid: false,
      };
    }

    if (!/^\d+$/.test(values.cashReceiptNumber)) {
      return {
        errorMessage: '현금영수증 번호는 숫자로만 입력해주세요.',
        isValid: false,
      };
    }
  }

  if (values.messageCardTextMessage.length < 1) {
    return {
      errorMessage: '메시지를 입력해주세요.',
      isValid: false,
    };
  }

  if (values.messageCardTextMessage.length > 100) {
    return {
      errorMessage: '메시지는 100자 이내로 입력해주세요.',
      isValid: false,
    };
  }

  return {
    isValid: true,
  };
};

const Wrapper = styled.div`
  border-left: 1px solid #e5e5e5;
  height: calc(100vh - ${HEADER_HEIGHT});
`;
