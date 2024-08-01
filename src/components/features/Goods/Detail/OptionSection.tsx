import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import type { OrderHistory } from '@/types';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [selectedOption, setSelectedOption] = useState<string>(
    options.length > 0 ? options[0].id.toString() : '',
  );
  const [count, setCount] = useState<string>('1');

  const totalPrice = useMemo(() => {
    return detail.price * Number(count);
  }, [detail, count]);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    const orderItem: OrderHistory = {
      id: parseInt(selectedOption, 10),
      count: parseInt(count, 10),
    };

    orderHistorySessionStorage.set(orderItem);

    navigate(RouterPath.order);
  };

  const handleInterestClick = () => {
    alert('관심 등록 완료');
  };

  return (
    <Wrapper>
      <SelectWrapper>
        <Select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Select>
        <CountOptionItem name="수량 선택" value={count} onChange={setCount} />
      </SelectWrapper>
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Button theme="black" size="large" onClick={handleClick}>
          나에게 선물하기
        </Button>
        <Button theme="lightGray" size="large" onClick={handleInterestClick}>
          관심 등록
        </Button>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const SelectWrapper = styled.div`
  margin-bottom: 20px;
`;
const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;

const PricingWrapper = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;
