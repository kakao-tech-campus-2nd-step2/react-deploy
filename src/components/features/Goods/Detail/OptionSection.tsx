import { Button, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAddToWishlist } from '@/api/hooks/useAddToWishlist';
import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;
type OptionType = {
  id: number;
  name: string;
  //나중에 추가하기
};

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options = [], error } = useGetProductOptions({ productId });
  const { addToWishlist } = useAddToWishlist();

  const [countAsString, setCountAsString] = useState('1');
  const { control, setValue, watch } = useForm({
    defaultValues: {
      optionId: '',
      optionSelect: [] as OptionType[],
    },
  });

  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);

  const navigate = useNavigate();
  const authInfo = useAuth();

  useMemo(() => {
    if (options.length > 0) {
      setValue('optionSelect', [options[0]] as OptionType[]);
    }
  }, [options, setValue]);

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

  const handleInterestClick = async () => {
    if (!authInfo) {
      const isConfirm = window.confirm(
        '로그인이 필요한 메뉴입니다.\n로그인 페이지로 이동하시겠습니까?',
      );

      if (!isConfirm) return;
      return navigate(getDynamicPath.login());
    }

    await addToWishlist({
      id: detail.id,
      name: detail.name,
      price: detail.price,
      imageUrl: detail.image_url,
    });
  };

  const addOption = async (option: OptionType) => {
    try {
      const response = await axios.post(`/api/products/${productId}/options`, option);
      setValue('optionSelect', [...(watch('optionSelect') || []), response.data]);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const updateOption = async (optionId: number, updatedOption: OptionType) => {
    try {
      await axios.put(`/api/products/${productId}/options/${optionId}`, updatedOption);
      setValue(
        'optionSelect',
        (watch('optionSelect') || []).map((opt: OptionType) =>
          opt.id === optionId ? updatedOption : opt,
        ),
      );
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  const deleteOption = async (optionId: number) => {
    try {
      await axios.delete(`/api/products/${productId}/options/${optionId}`);
      setValue(
        'optionSelect',
        (watch('optionSelect') || []).filter((opt: OptionType) => opt.id !== optionId),
      );
    } catch (err) {
      console.error((err as Error).message);
    }
  };
  const handleSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptionId = e.target.value;
    const selectedOption =
      options.find((opt: OptionType) => opt.id === parseInt(selectedOptionId, 10)) || null;

    setValue('optionId', selectedOptionId);
    setValue('optionSelect', selectedOption ? [selectedOption] : []);
  };

  return (
    <Wrapper>
      <Controller
        name="optionId"
        control={control}
        render={({ field }) => (
          <Select {...field} onChange={handleSelector} value={field.value || ''}>
            {options.map((option: OptionType) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        )}
      />
      <CountOptionItem
        name={watch('optionSelect')[0]?.name || '옵션 이름'}
        value={countAsString}
        onChange={setCountAsString}
        productId={productId}
      />

      {error && <p>Error: {error.message}</p>}
      <Button onClick={() => addOption({ id: Date.now(), name: 'New Option' })}>옵션 추가</Button>
      <ul>
        {watch('optionSelect')?.map((option: OptionType) => (
          <li key={option.id}>
            {option.name}
            <Button onClick={() => updateOption(option.id, { ...option, name: 'Updated Option' })}>
              수정
            </Button>
            <Button onClick={() => deleteOption(option.id)}>삭제</Button>
          </li>
        ))}
      </ul>
      <BottomWrapper>
        <Button colorScheme="blue" onClick={handleInterestClick}>
          관심 등록
        </Button>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <Button colorScheme="black" size="large" onClick={handleClick}>
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
