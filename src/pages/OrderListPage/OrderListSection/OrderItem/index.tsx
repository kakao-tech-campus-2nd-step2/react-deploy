import { css } from '@emotion/react';

import { Text } from '@chakra-ui/react';

import { OrderListData } from '@/types/orderType';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

type OrderItemProps = {
  orderDetail: OrderListData;
};

export const OrderItem = ({ orderDetail }: OrderItemProps) => {
  return (
    <Container flexDirection="column" gap="0.5rem">
      <Container gap="0.3rem">
        <Text>주문일</Text>
        <Text as="b">2024.07.31</Text>
      </Container>
      <Card gap="1rem" css={cardStyle}>
        <Image
          src={orderDetail.productImageUrl}
          ratio="square"
          width="10rem"
          radius={0.3}
        />
        <Container flexDirection="column" gap="0.5rem">
          <Container flexDirection="column">
            <Text textColor="GrayText" fontSize="small">
              {orderDetail.productName}
            </Text>
            <Text>{orderDetail.optionName}</Text>
          </Container>
          <Container gap="0.5rem">
            <Text as="b">{orderDetail.price}원</Text>
            <Text textColor="GrayText">수량 {orderDetail.count}개</Text>
          </Container>
        </Container>
        <Container alignItems="flex-end" css={totalPriceStyle}>
          <Text as="b">총 {orderDetail.totalPrice}원</Text>
        </Container>
      </Card>
    </Container>
  );
};

const cardStyle = css({
  padding: '1rem',
  background: 'white',
});

const totalPriceStyle = css({
  width: 'fit-content',
  whiteSpace: 'nowrap',
});
