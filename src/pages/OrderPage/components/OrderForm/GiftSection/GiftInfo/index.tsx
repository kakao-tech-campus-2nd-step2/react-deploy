import { Heading, Text } from '@chakra-ui/react';

import { useCurrentOptions } from '@/api/hooks/useCurrentOption';
import { useProductDetail } from '@/api/hooks/useProductDetail';
import { OrderHistory } from '@/types/orderType';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

export const GiftInfo = ({ orderHistory }: { orderHistory: OrderHistory }) => {
  const { data: productDetail } = useProductDetail(orderHistory.productId);
  const { optionName } = useCurrentOptions(
    orderHistory.productId,
    orderHistory.optionId
  );

  return (
    <Container flexDirection="column" gap="1rem" css={{ padding: '1rem' }}>
      <Heading size="sm">선물내역</Heading>
      <Card gap="1rem" css={{ padding: '1rem' }}>
        <Image
          src={productDetail.imageUrl}
          ratio="square"
          width="6rem"
          radius={0.2}
        />
        <Container flexDirection="column" gap="0.2rem">
          <Text as="b">{productDetail.name}</Text>
          <Text>
            {optionName} x {orderHistory.quantity}개
          </Text>
        </Container>
      </Card>
    </Container>
  );
};
