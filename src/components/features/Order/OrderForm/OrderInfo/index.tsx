import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

import { useOrder } from '@/api/hooks/useOrder';
import { useAuth } from '@/provider/Auth';

type Props = {
  orderHistory: OrderHistory;
};
export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const { data: detail } = useGetProductDetail({ productId: id.toString() });
  const totalPrice = detail.price * count;

  const { createOrder, isLoading, order, error } = useOrder();
  const authInfo = useAuth();

  const handleOrderSubmit = async () => {
    if (!authInfo?.token) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      console.log(id);
      await createOrder({
        optionId: id,
        quantity: count,
        message: "주문한 상품입니다.",
      },
      authInfo.token
    );
      alert('주문이 성공적으로 처리되었습니다.');
    } catch (error) {
      alert('주문 처리 중 문제가 발생했습니다.');
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
      <Button 
        type="button" 
        onClick={handleOrderSubmit} 
        disabled={isLoading} // 로딩 중일 때 버튼 비활성화
      >
        {isLoading ? '결제 처리 중...' : `${totalPrice}원 결제하기`}
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
