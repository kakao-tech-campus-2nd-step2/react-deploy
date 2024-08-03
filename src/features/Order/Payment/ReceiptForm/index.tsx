import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Checkbox, Select, Input } from '@chakra-ui/react';
import { Button } from '@components/common';
import { useFormContext } from 'react-hook-form';
import { OrderDataFormValues } from '@pages/Order';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '@hooks/useSessionStorage';
import { useGetPoint } from '@apis/point/useGetPoint';
import { ROUTE_PATH } from '@routes/path';
import { useOrders } from '@apis/orders/useOrders';
import { validatePayment } from './validation';

const SUCCESS_ORDER = '주문이 완료되었습니다.';
const FAIL_ORDER = '주문이 실패하였습니다.';

export default function ReceiptForm() {
  const [storedValue, setValue] = useSessionStorage('orderHistory', '');
  const { optionId, quantity, price } = JSON.parse(storedValue);
  const [point, setPoint] = useState(0);
  const [totalPrice, setTotalPrice] = useState(price);
  const navigate = useNavigate();
  const { register, watch, handleSubmit } = useFormContext<OrderDataFormValues>();
  const { hasCashReceipt } = watch();
  const { mutate } = useOrders();
  const { data: pointData } = useGetPoint();
  if (pointData) setPoint(pointData.point);

  useEffect(() => {
    if (pointData) {
      setPoint(pointData.point);
    }
  }, [pointData]);

  const handleOrders = (message: string) => {
    mutate(
      { message, optionId, quantity, usedPoint: point },
      {
        onSuccess: () => {
          alert(SUCCESS_ORDER);
          navigate(ROUTE_PATH.HOME);
        },
        onError: () => alert(FAIL_ORDER),
      },
    );
  };

  const onSubmit = (data: OrderDataFormValues) => {
    const errorMessage = validatePayment(data.message, data.hasCashReceipt, data.cashReceiptNumber);
    if (errorMessage) return alert(errorMessage);
    handleOrders(data.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox mb={4} fontWeight={700} {...register('hasCashReceipt')}>
        현금영수증 신청
      </Checkbox>
      {hasCashReceipt && (
        <>
          <Select mb={2} {...register('cashReceiptType')}>
            <option value="개인소득공제">개인소득공제</option>
            <option value="사업자증빙용">사업자증빙용</option>
          </Select>
          <Input placeholder="(-없이) 숫자만 입력해주세요." mb={4} {...register('cashReceiptNumber')} />
        </>
      )}
      <TotalAmount>
        <dl>
          <dt>사용 가능한 포인트</dt>
          <dd>{`${point} 포인트`}</dd>
          <dt>최종 결제금액</dt>
          <dd>{`${price}원`}</dd>
        </dl>
      </TotalAmount>
      <ButtonContainer>
        <Button theme="primary" type="button" onClick={() => setTotalPrice(price - point)}>
          포인트 사용하기
        </Button>
        <Button theme="kakao" type="submit">
          {totalPrice} 결제하기
        </Button>
      </ButtonContainer>
    </form>
  );
}

const TotalAmount = styled.div`
  padding: 18px 20px;
  border-radius: 4px;
  background-color: rgb(245, 245, 245);
  margin-bottom: 20px;

  dl {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }

  dt {
    font-size: 14px;
  }

  dd {
    font-size: 20px;
    margin-bottom: 24px;
  }

  dd:last-of-type {
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  button {
    margin-bottom: 24px;
  }

  button:last-of-type {
    margin-bottom: 0;
  }
`;
