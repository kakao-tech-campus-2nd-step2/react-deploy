import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/product/product-detail.api';
import { useGetProductOptions } from '@/api/hooks/product/product-options.api';
import type { ProductDetailRequestParams } from '@/api/hooks/product/type';
import { useGetWishList } from '@/api/hooks/wish-list/wish-list-add.api';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const addWishListMutation = useGetWishList();

  const checkAuthAndNavigate = (callback: () => void) => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return false;
      navigate(getDynamicPath.login());
      return false;
    }
    callback();
    return true;
  };

  const handleGift = () => {
    checkAuthAndNavigate(() => {
      orderHistorySessionStorage.set({
        id: parseInt(productId),
        count: parseInt(countAsString),
      });

      navigate(RouterPath.order);
    });
  };

  const handleWIshListClick = () => {
    checkAuthAndNavigate(() => {
      addWishListMutation.mutate({ productId: Number(productId) });
    });
  };

  return (
    <Wrapper>
      <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Box display="flex" justifyContent="space-between">
          <Button theme="outline" style={{ width: '5rem' }} onClick={handleWIshListClick}>
            <FaHeart style={{ color: '#ff0000' }} />
          </Button>
          <Button theme="black" size="large" onClick={handleGift}>
            나에게 선물하기
          </Button>
        </Box>
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
