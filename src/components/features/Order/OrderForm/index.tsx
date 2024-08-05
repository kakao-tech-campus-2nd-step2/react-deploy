
// src/components/features/Order/OrderForm/index.tsx

import styled from '@emotion/styled';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Spacing } from '@/components/common/layouts/Spacing';
import { SplitLayout } from '@/components/common/layouts/SplitLayout';
import type { OrderFormData, OrderHistory } from '@/types';

import { HEADER_HEIGHT } from '../../Layout/Header';
import { GoodsInfo } from './GoodsInfo';
import { OrderFormMessageCard } from './MessageCard';
import { OrderFormOrderInfo } from './OrderInfo';

import { useOrder } from '@/api/hooks/useOrder';
import { useAuth } from '@/provider/Auth';
import { AxiosError } from 'axios';


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

  const navigate = useNavigate();
  
  const { mutate: createOrder, status } = useOrder();
  const authInfo = useAuth();
  const isLoading = status === "pending"; // "pending" 상태를 로딩 중으로 간주


  const handleForm = async (values: OrderFormData) => {
    const { errorMessage, isValid } = validateOrderForm(values);

    if (!isValid) {
      alert(errorMessage);
      return;
    }


    if (!authInfo?.token) {
      alert('로그인이 필요합니다.');
      return;
    }

    createOrder(
      { 
        params: {
          optionId: values.productId + 1,
          quantity: values.productQuantity,
          message: values.messageCardTextMessage,
        }, 
        token: authInfo.token,
      },
      {
        onSuccess: (response) => {
          alert('주문이 완료되었습니다.');
          navigate(`/orders/${response.id}`);
        },
        onError: (error) => {
          // error가 AxiosError인지 확인하는 타입 가드
          if ((error as AxiosError).isAxiosError) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 500) {
              // 백엔드 서버 사정으로 인해 500이 정상처리됩니다
              console.error('500이면 정상처리입니다. : ', axiosError);
              alert('주문이 완료되었습니다. 관심등록 목록에서 주문한 상품은 삭제됩니다.');
            } else {
              console.error('진짜 오류: ', axiosError);
              alert('주문 중 오류가 발생했습니다. 관심등록된 상품만 구매가 가능합니다.');
            }
          } else {
            console.error('기타 오류: ', error);
            alert('주문 중 알 수 없는 오류가 발생했습니다.');
          }
        },
      }
    );
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

        <SplitLayout sidebar={<OrderFormOrderInfo orderHistory={orderHistory} isLoading={isLoading} />}>

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
