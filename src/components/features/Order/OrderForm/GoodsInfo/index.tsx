import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/products/useGetProductDetail';
import { Image } from '@/components/common/Image';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { LabelText } from '../Common/LabelText';

type Props = {
  orderHistory: OrderHistory;
};

export const GoodsInfo = ({ orderHistory }: Props) => {
  const { productId, optionName, count } = orderHistory;
  const { data: detail } = useGetProductDetail({ productId: productId.toString() });
  const totalPrice = detail.price * count;

  return (
    <Wrapper>
      <LabelText>선물내역</LabelText>
      <Spacing />
      <Goods>
        <GoodsInner>
          <GoodsImage>
            <Image src={detail.imageUrl} width={86} ratio="square" />
          </GoodsImage>
          <GoodsTextWrapper>
            <GoodsTextTitle>
              <p className="product">{detail.name}</p>
              <div className="option">
                {optionName ? <span className="icon">옵션</span> : null}
                <span>
                  {optionName} {count}개
                </span>
              </div>
            </GoodsTextTitle>
          </GoodsTextWrapper>
        </GoodsInner>
        <Divider color="#ededed" />
        <GoodsTotalPrice>
          <span className="label">결제금액</span>
          <span className="price">
            <strong>{totalPrice}</strong>원
          </span>
        </GoodsTotalPrice>
      </Goods>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 16px;
`;

const Goods = styled.div`
  width: 100%;
  padding: 20px 16px 16px;
  border-radius: 8px;
  border: 1px solid #ededed;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
`;

const GoodsInner = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 12px;
`;

const GoodsImage = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  overflow: hidden;
`;

const GoodsTextWrapper = styled.div`
  padding-left: 8px;
`;

const GoodsTextTitle = styled.p`
  font-weight: 400;
  margin-top: 3px;
  color: #222;
  overflow: hidden;
  font-weight: 400;

  .product {
    font-size: 14px;
    line-height: 18px;
  }

  .option {
    display: block;
    margin-top: 3px;
    font-size: 13px;
    line-height: 19px;
    color: #888;
    letter-spacing: -0.015em;
    word-break: break-all;

    .icon {
      display: inline-block;
      width: 28px;
      height: 18px;
      margin: 1px 4px 0 0;
      background-position: -175px -740px;
      vertical-align: top;
      border: 1px solid #d3d3d3;
    }
  }
`;

const GoodsTotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  width: 100%;
  padding-top: 16px;
  line-height: 16px;

  .label {
    float: left;
    font-size: 13px;
    color: #222;
  }

  .price {
    display: inline-block;
    font-size: 15px;
    color: #000;
    letter-spacing: -0.02em;
    vertical-align: top;
  }
`;
