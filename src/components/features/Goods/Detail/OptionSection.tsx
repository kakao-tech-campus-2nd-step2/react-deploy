import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { type ProductDetailRequestParams, useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { BASE_URL, fetchInstance } from '@/api/instance';
import { Button } from '@/components/common/Button';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { type InterestItem } from '@/types';
import { authSessionStorage, orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';
import { OptionSelector } from './OptionItem/OptionSelector';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });
  
  const methods = useForm();
  const { watch } = methods;

  const watchedOption = watch('optionSelect');

  const [countAsString, setCountAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

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

    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
      optionId: watchedOption.id,
    });

    navigate(RouterPath.order);
  };

  const handleInterestClick = async () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
        return navigate(getDynamicPath.login());
    };

    try {
      const interestItem: InterestItem = {
        productId: parseInt(productId),
        product: {
          id: detail.id,
          name: detail.name,
          price: detail.price,
          imageUrl: detail.imageUrl,
        }
      };

      const response = await fetchInstance.post(`${BASE_URL}/api/wishes`, interestItem, {
        headers: {
          Authorization: `${authSessionStorage.get()?.token}`,
          'Content-Type': 'application/json'
        }
      });

      // 관심 상품 등록 성공 (201)
      if (response.status === 201) {
        alert('관심 상품으로 등록 성공하였습니다.');
      }

      // 관심 상품 등록 실패 (400)
      else if (response.status === 400) {
        alert('관심 상품으로 등록 실패하였습니다.');
      }
      // 상품 찾기 실패 (404)
      else if (response.status === 404) {
        alert('상품을 찾을 수 없습니다.');  
      }
    } catch (error) {
        console.error(error);
        alert('관심 상품 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <FormProvider {...methods}>
      <Wrapper>
        <OptionSelectorWrapper>
          <OptionSelector options={options} />
        </OptionSelectorWrapper>
        <CountOptionItem name={watchedOption?.name} value={countAsString} onChange={setCountAsString} />
        <BottomWrapper>
          <PricingWrapper>
            <span>총 결제 금액</span>
            <Price>{totalPrice}원</Price>
          </PricingWrapper>
          <ButtonWrapper>
            <Button theme="black" size="small" onClick={handleInterestClick}>
              관심 상품 추가
            </Button>
            <Button theme="black" size="large" onClick={handleClick}>
              나에게 선물하기
            </Button>
          </ButtonWrapper>
        </BottomWrapper>
      </Wrapper>
    </FormProvider>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #fafafa; 
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OptionSelectorWrapper = styled.div`
  margin-bottom: 16px;
  background-color: #fafafa; 
  border: 1px solid #e0e0e0; 
  border-radius: 4px; 
  padding: 8px;
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PricingWrapper = styled.div`
  padding: 16px;
  border-radius: 4px;
  background-color: #ffffff; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0; 
`;

const Price = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
