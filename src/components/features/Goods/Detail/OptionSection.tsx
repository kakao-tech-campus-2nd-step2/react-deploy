import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { useHandleWish } from '@/hooks/useHandleWish';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const navigate = useNavigate();

  const authInfo = useAuth();
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });
  const [optionId, setOptionId] = useState<number>(options[0].optionId);
  const [countAsString, setCountAsString] = useState('1');
  const { isWish, handleWishClick } = useHandleWish();

  console.log(optionId);

  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptionId(parseInt(e.target.value));
  };

  const handleOrderClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      productId: parseInt(productId),
      optionId: optionId,
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  return (
    <Wrapper>
      <OptionContainer>
        <OptionSelector onChange={handleOptionSelect} defaultValue={optionId}>
          {options.map((opt) => (
            <option key={opt.optionId} value={opt.optionId}>
              {opt.name || opt.optionName}
            </option>
          ))}
        </OptionSelector>
        <CountOptionItem
          name={options[0].optionName || options[0].name}
          value={countAsString}
          onChange={setCountAsString}
        />
      </OptionContainer>
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <ButtonBox>
          <Button theme="darkGray" width="75px" onClick={handleWishClick}>
            {isWish ? (
              <AiFillHeart style={{ color: 'rgb(241, 42, 36)', fontSize: '24px' }} />
            ) : (
              <AiOutlineHeart style={{ color: '#fff', fontSize: '24px' }} />
            )}
          </Button>
          <Button theme="black" onClick={handleOrderClick}>
            나에게 선물하기
          </Button>
        </ButtonBox>
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

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const OptionSelector = styled.select`
  display: block;
  width: 100%;
  height: 38px;
  margin: 0;
  padding: 0 42px 0 14px;
  font-size: 14px;
  font-weight: 700;
  line-height: 38px;

  border: 1px solid #ededed;
  border-radius: 2px;
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

const ButtonBox = styled.div`
  display: flex;
  width: 100%;
  gap: 2px;
`;
