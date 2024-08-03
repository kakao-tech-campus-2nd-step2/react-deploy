import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
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
  const [points, setPoints] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalPrice] = useState(0); 

  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: id,
      productQuantity: count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
      cashReceiptNumber: '',
    },
  });
  const { handleSubmit } = methods;

  useEffect(() => {
    // Fetch user points
    fetchPoints();
  }, []);

  useEffect(() => {
    // Calculate discounted price if total price is above 50000
    if (totalPrice >= 50000) {
      const discount = totalPrice * 0.1;
      setDiscountedPrice(totalPrice - discount);
    } else {
      setDiscountedPrice(totalPrice);
    }
  }, [totalPrice]);

  const fetchPoints = async () => {
    try {
      const response = await axios.get('/api/users/points'); // Adjust the API endpoint as needed
      setPoints(response.data.points);
    } catch (error) {
      console.error('Failed to fetch points:', error);
    }
  };

  const handleForm = async (values: OrderFormData) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    const pointsToDeduct = discountedPrice * 0.1; // 10% of the discounted price

    if (points >= pointsToDeduct) {
      try {
        // Deduct points
        await axios.put('/api/users/points', { points: points - pointsToDeduct });
        setPoints(points - pointsToDeduct);

        // Proceed with order
        console.log('values', values);
        alert('주문이 완료되었습니다.');
      } catch (error) {
        console.error('Failed to update points or complete order:', error);
      }
    } else {
      alert('포인트가 부족합니다.');
    }
  };

  // Submit 버튼을 누르면 form이 제출되는 것을 방지하기 위한 함수
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
            <Spacing height={8} backgroundColor="#ededed" />
            <CashReceiptWrapper>
              <label htmlFor="cashReceiptNumber">현금영수증 번호</label>
              <input
                type="text"
                id="cashReceiptNumber"
                {...methods.register('cashReceiptNumber')}
              />
            </CashReceiptWrapper>
            <Button type="submit">주문하기</Button>
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

const CashReceiptWrapper = styled.div`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;
