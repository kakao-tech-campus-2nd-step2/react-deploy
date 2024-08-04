import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';

import { postOrder } from '@/api/hooks/order.mock'; // Adjust the path as needed
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

  const methods = useForm<OrderFormData>({
    defaultValues: {
      productId: id,
      productQuantity: count,
      senderId: 0,
      receiverId: 0,
      hasCashReceipt: false,
    },
  });
  const { handleSubmit } = methods;

  const handleForm = async (values: OrderFormData) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }

    try {
      const response = await postOrder(values.productId, values.productQuantity);
      console.log(response);
      alert(`주문이 완료되었습니다.`);
    } catch (error) {
      if (error instanceof Error) {
        alert(`주문 제출 중 오류가 발생했습니다: ${error.message}`);
      } else {
        alert('주문 제출 중 알 수 없는 오류가 발생했습니다.');
      }
    }
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
