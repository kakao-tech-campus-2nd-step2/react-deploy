import styled from '@emotion/styled';

import { Image } from '@/components/common/Image';

export type DefaultOrderItemsProps = {
  imageSrc: string;
  title: string;
  amount: number;
  quantity: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const DefaultOrderItem = ({ imageSrc, title, amount, quantity }: DefaultOrderItemsProps) => {
  return (
    <Wrapper>
      <Image src={imageSrc} alt={`${title} 소개`} width="100px" ratio="square" radius={4} />
      <InfoWrapper>
        <Title>{title}</Title>
        <Amount>
          {amount}
          <span>원</span>
          <Quantity>수량 {quantity}개</Quantity>
        </Amount>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  border-radius: 6px;
  background-color: white;
  display: flex;
  padding: 20px;
  gap: 30px;
`;

const InfoWrapper = styled.div`
  width: 100%;
  padding-top: 12px;
`;

const Quantity = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #999;
  border-left: 1px solid #999;
  margin: 2px 0px 0px 8px;
  padding-left: 8px;
`;

const Title = styled.h3`
  width: 100%;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Amount = styled.p`
  width: 100%;
  display: flex;
  font-size: 18px;
  line-height: 30px;
  color: #222;
  font-weight: 700;
  word-break: break-word;
  align-items: center;
  gap: 2px;
  & > span {
    font-weight: 400;
  }
`;
