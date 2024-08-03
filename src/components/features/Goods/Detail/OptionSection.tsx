import styled from '@emotion/styled';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { usePostWishlist } from '@/api/hooks/useWishlist';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';
import type { ProductOptionsData } from '@/types';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [selectedOption, setSelectedOption] = useState<ProductOptionsData | null>(null);
  const [countAsString, setCountAsString] = useState('1');

  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedOption(options[0]);
      setCountAsString('1');
    }
  }, [options]);

  const totalPrice = useMemo(() => {
    return detail?.price * Number(countAsString) || 0;
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();

  const postWishlist = usePostWishlist();

  const handleClick = useCallback(() => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  }, [authInfo, navigate, productId, countAsString]);

  const handleAddToWishlist = useCallback(() => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    postWishlist.mutate(
      { productId: productId.toString() },
      {
        onSuccess: () => {
          alert('관심 목록에 추가되었습니다.');
        },
        onError: (error) => {
          console.error('관심 목록 추가 실패:', error);
          alert('관심 목록 추가에 실패했습니다. 다시 시도해 주세요.');
        },
      }
    );
  }, [authInfo, navigate, postWishlist, productId]);

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    const option = options[selectedIndex];
    setSelectedOption(option);
    setCountAsString('1');
  };

  return (
    <Wrapper>
      <SelectWrapper>
        {selectedOption && (
          <CountOptionItem
            selectOptions={options}
            value={countAsString}
            onChange={setCountAsString}
            maxValues={selectedOption.quantity}
            onOptionChange={handleOptionChange}
          />
        )}
      </SelectWrapper>
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <BtnWrapper>
          <HeartButton theme="black" size="large" onClick={handleAddToWishlist}>
            ❤
          </HeartButton>
          <GiftButton theme="black" size="large" onClick={handleClick}>
            나에게 선물하기
          </GiftButton>
        </BtnWrapper>
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

const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  button {
    background-color: black;
    color: white;
    width: 50px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }`

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

const SelectWrapper = styled.article`
  width: 100%;
  max-width: 500px;
  padding: 16px 16px 60px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 32px 32px 80px;
  }
`;

const HeartButton = styled(Button)`
  flex: 1;
  font-size:20px;
`;

const GiftButton = styled(Button)`
  flex: 3;
`;
