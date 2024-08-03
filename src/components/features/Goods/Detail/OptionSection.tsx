import { Button, useToast } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect,useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { type ProductDetailRequestParams, useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { BASE_URL } from '@/api/instance';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options = [] } = useGetProductOptions(productId);

  const [selectedOptionIndex] = useState(0);
  const selectedOption = options[selectedOptionIndex] || { id: 0, quantity: 0 };

  const [countAsString, setCountAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (authInfo?.token) {
      console.log('Current Auth Token:', authInfo.token);
    } else {
      console.warn('User is not authenticated.');
    }
  }, [authInfo]);

  const handleClick = () => {
    if (!authInfo) {
      const isConfirm = window.confirm('로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?');
      if (!isConfirm) return;
      navigate(getDynamicPath.login());
    }

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });
    navigate(RouterPath.order);
  };

  const handleAddToWishlist = async () => {
    if (!authInfo?.token) {
      toast({ title: "로그인이 필요합니다.", status: "warning" });
      return;
    }

    try {
      console.log('Adding to wishlist:', {
        optionId: selectedOption.id,
        token: authInfo.token, // 토큰 로그 출력
      });
  
      const response = await fetch(`${BASE_URL}/api/wishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authInfo.token}`,
        },
        body: JSON.stringify({ 
          optionId: selectedOption.id, 
          quantity: parseInt(countAsString, 10) 
        }),
      });
  
      console.log('Check if liked response:', response);
      console.log('Response status:', response.status);

      if (response.status === 201) {
        toast({ title: "관심 상품으로 등록되었습니다.", status: "success" });
      } else {
        const errorData = await response.json();
        toast({
          title: "오류 발생",
          description: `위시리스트에 추가하는 중 오류가 발생했습니다: ${errorData.message || 'Unknown error'}`,
          status: "error",
        });
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "오류 발생",
        description: "위시리스트에 추가하는 중 문제가 발생했습니다.",
        status: "error",
      });
    }
  };

  if (!options.length) {
    return <div>옵션을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <Wrapper>
      <CountOptionItem
        name={options[selectedOptionIndex]?.name || '옵션 없음'}
        minValues={1}
        maxValues={selectedOption.quantity}
        value={countAsString}
        onChange={(value) => {
          // 수량 제한 적용
          const numValue = parseInt(value, 10);
          if (numValue > 0 && numValue <= selectedOption.quantity) {
            setCountAsString(value);
          }
        }}
      />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Button colorScheme="blue" size="lg" onClick={handleClick}>
          나에게 선물하기
        </Button>
        <Button colorScheme="green" size="lg" onClick={handleAddToWishlist}>
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
