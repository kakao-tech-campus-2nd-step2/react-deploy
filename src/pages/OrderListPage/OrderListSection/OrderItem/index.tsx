import { Text } from '@chakra-ui/react';

import { DEFAULT_IMAGE_URL } from '@/constants/data';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

export const OrderItem = () => {
  return (
    <Container flexDirection="column" gap="0.5rem">
      <Container gap="0.3rem">
        <Text>주문일</Text>
        <Text as="b">2024.07.31</Text>
      </Container>
      <Card gap="1rem" css={{ padding: '1rem' }}>
        <Image
          src={DEFAULT_IMAGE_URL}
          ratio="square"
          width="6rem"
          radius={0.2}
        />
        <Container flexDirection="column">
          <Text textColor="GrayText">제품 명</Text>
          <Text>옵션 명</Text>
          <Container gap="1rem">
            <Text>10000원</Text>
            <Text textColor="GrayText">수량 1개</Text>
          </Container>
        </Container>
        <Container
          alignItems="flex-end"
          css={{ width: 'fit-content', whiteSpace: 'nowrap' }}
        >
          총 10000원
        </Container>
      </Card>
    </Container>
  );
};
