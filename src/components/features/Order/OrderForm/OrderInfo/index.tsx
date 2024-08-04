import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { useGetProductDetail } from '@/api/hooks/products/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};

export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { productId, count } = orderHistory;
  const { data: detail } = useGetProductDetail({ productId: productId.toString() });

  const totalPrice = detail.price * count;
  const points = 1000; // 바꾸기
  const [discount, setDiscount] = useState<number>(100); // 바꾸기
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const sellingPrice = totalPrice - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setInputValue(undefined);
      setDiscount(0);
    } else {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue)) {
        setInputValue(0);
        setDiscount(0);
      } else {
        setInputValue(parsedValue);
        setDiscount(parsedValue);
      }
    }
  };

  const handleUseAllPoints = () => {
    setInputValue(points);
    setDiscount(points);
  };

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <>
        <Subtitle>
          <LabelText>쇼핑포인트 사용</LabelText>
          <span className="point_g">{points} P</span>
        </Subtitle>
        <ItemWrapper>
          <PointInputWrapper>
            <PointInput type="number" value={inputValue} onChange={handleInputChange} />
            <span className="ico_point">P</span>
          </PointInputWrapper>
          <PointButton type="button" onClick={handleUseAllPoints}>
            전액사용
          </PointButton>
        </ItemWrapper>
      </>
      <Divider color="#ededed" />
      <>
        <CashReceiptFields />
      </>
      <Divider color="#ededed" />
      <>
        <Subtitle>
          <LabelText>결제정보</LabelText>
        </Subtitle>
        <Divider color="#ededed" />
        <ListWrapper>
          <li className="list_item">
            <span className="tit_price">총 상품금액 ({count}개)</span>
            <span className="num_price">{totalPrice}원</span>
          </li>
          <li className="list_item">
            <span className="tit_price">쇼핑포인트 사용</span>
            <span className="num_price">- {discount}원</span>
          </li>
        </ListWrapper>
        <ItemWrapper>
          <LabelText>최종 결제금액</LabelText>
          <HeadingText>{sellingPrice}원</HeadingText>
        </ItemWrapper>
      </>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit" fontSize="18px" fontWeight={700}>
        {sellingPrice}원 결제하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 16px;
  overflow: scroll;
`;

const Title = styled.h6`
  padding: 24px 0 20px;
`;

const Subtitle = styled.h3`
  padding: 16px;
  border-bottom: 1px solid #ededed;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .point_g {
    font-style: normal;
    font-weight: 400;
    float: right;
    font-size: 14px;
  }
`;

const ListWrapper = styled.ul`
  padding: 16px 16px 4px;
  list-style: none;
  font-size: 14px;
  line-height: 1.5;

  .list_item {
    overflow: hidden;
    padding-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  margin: 0 16px;
  padding: 16px 0;
  border-top: 1px solid #f5f5f5;
  justify-content: space-between;
  align-items: center;
  gap: 6px;
  position: relative;
`;

const PointInputWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  font-size: 14px;
  line-height: 1.5;

  .ico_point {
    position: absolute;
    right: 14px;
    top: 10px;
    width: 7px;
    height: 10px;
  }
`;

const PointInput = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 23px 0 42px;
  border: 1px solid #ededed;
  border-radius: 2px;
  box-sizing: border-box;
  text-align: right;
  color: #222;
`;

const PointButton = styled.button`
  width: 80px;
  height: 40px;
  border: 1px solid #ededed;
  border-radius: 2px;
  font-size: 14px;
  line-height: 38px;
  background-color: #fff;
  color: #222;
  margin-left: 8px;
`;
