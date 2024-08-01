import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { usePostWish } from '@/api/hooks/usePostWish';
import { Button } from '@/components/common/Button';
import { LoadingView } from '@/components/common/View/LoadingView';
import { useAuth } from '@/provider/Auth/AuthContext';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  // 훅들을 컴포넌트 상단에서 호출
  const { data } = useGetProductDetail({ productId });
  const { data: options, loading, error } = useGetProductOptions({ productId });
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { addWish } = usePostWish();

  const [countAsString, setCountAsString] = useState('1');

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
      optionId: options?.options[0].id as number,
      optionName: options?.options[0].name as string
    });

    navigate(RouterPath.order);
  };

  const handleWishClick = async () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    const result = await addWish({ productId });

    if (result === 200) {
      alert('위시 상품에 등록되었습니다.')
    } else {
      alert('위시 상품 등록에 실패하였습니다.')
    }
  }

  if (loading) return <LoadingView />;
  if (error) return <TextView>에러가 발생했습니다.</TextView>;
  if (!options) return <></>;

  return (
    <Wrapper>
      {
        options.optionCount >= 2
          ? options.options.map((option) => (
            <CountOptionItem
              key={option.id}
              name={option.name}
              value={countAsString}
              onChange={setCountAsString}
            />
          ))
          : (
            <CountOptionItem
              name={options.options[0].name}
              value={countAsString}
              onChange={setCountAsString}
            />
          )
      }
      <BottomWrapper>
        {data ?
          <PricingWrapper>
            총 결제 금액 <span>{data.price * Number(countAsString)}원</span>
          </PricingWrapper>
          : ''}
        <BtnWrapper>
          <Button style={{ width: "110px", fontSize: "25px", marginRight: "10px" }} theme="lightGray" size="large" onClick={handleWishClick}>
            ♡
          </Button>
          <Button theme="black" size="large" onClick={handleClick}>
            나에게 선물하기
          </Button>
        </BtnWrapper>
      </BottomWrapper>
    </Wrapper >
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

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`