import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { getBaseURL } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';
import WishButton from './WishButton';

type Props = {
  productId: string;
};

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState('1');
  const [isFavorited, setIsFavorited] = useState(false);
  const totalPrice = useMemo(() => detail.price * Number(countAsString), [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();
  const location = useLocation();

  const pathname = location.pathname;
  const urlProductId = pathname.split('/').pop(); // Extract the last segment of the path

  const handleWishButtonClick = async () => {
    const token = authInfo?.token;
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );
      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    if (isFavorited) {
      setIsFavorited(false);
      return;
    }

    try {
      const requestBody = {
        id: urlProductId ? parseInt(urlProductId) : 0,
      };
      console.log(urlProductId);
      const response = await fetch(getBaseURL() + '/api/wish', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer "${token}"`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);
      const responseJson = await response.json();
      console.log('Response Text:', responseJson);

      if (!response.ok) {
        throw new Error('관심 등록 실패');
      }

      try {
        const responseData = JSON.parse(responseJson);
        console.log('Response Data:', responseData);
      } catch (jsonError) {
        console.error('Failed to parse response as JSON:', jsonError);
      }

      alert('관심 등록 완료');
      setIsFavorited(true);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error:', err);
        alert('관심 등록 실패: ' + err.message);
      }
    }
  };

  const handleClick = () => {
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
  };

  return (
    <Wrapper>
      {options && options.length > 0 && (
        <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      )}
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice.toLocaleString()}원</span>
        </PricingWrapper>
        <ButtonWrapper>
          <WishButton isFavorited={isFavorited} onClick={handleWishButtonClick} />
          <Button theme="black" size="large" onClick={handleClick}>
            나에게 선물하기
          </Button>
        </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
