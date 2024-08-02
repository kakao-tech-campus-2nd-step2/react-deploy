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
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [countAsString, setCountAsString] = useState<string>('1');
  const totalPrice = useMemo(() => {
    if (detail && selectedOption) {
      return detail.price * Number(countAsString);
    }
    return 0;
  }, [detail, selectedOption, countAsString]);

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

    if (!selectedOption) {
      alert('옵션을 선택해주세요.');
      return;
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  const handleOptionClick = (optionId: string) => {
    if (selectedOption === optionId) {
      // 이미 선택된 옵션을 다시 클릭하면 선택 해제
      setSelectedOption(null);
    } else {
      setSelectedOption(optionId);
    }
  };

  return (
    <Wrapper>
      <OptionsWrapper>
        {options.map((option) => (
          <OptionContainer key={option.id}>
            <OptionButton
              onClick={() => handleOptionClick(option.id.toString())}
              disabled={!!selectedOption && selectedOption !== option.id.toString()}
            >
              {option.name}
            </OptionButton>
            {selectedOption === option.id.toString() && (
              <CountOptionItem
                name={option.name}
                value={countAsString}
                onChange={(newCount) => setCountAsString(newCount)}
              />
            )}
          </OptionContainer>
        ))}
      </OptionsWrapper>
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Button theme="black" size="large" onClick={handleClick}>
          나에게 선물하기
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

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const OptionButton = styled.button<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#f5f5f5' : '#e0e0e0')};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #f5f5f5;
    color: #aaa;
  }
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
