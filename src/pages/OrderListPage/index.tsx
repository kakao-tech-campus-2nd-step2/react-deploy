import { Text } from '@chakra-ui/react';

import BaseLayout from '@/layouts/BaseLayout';

import { Content } from '@/components/Content';

import { OrderListSection } from './OrderListSection';

export const OrderListPage = () => {
  return (
    <BaseLayout>
      <Content flexDirection="column" gap="1rem" maxWidth="40rem">
        <Text as="b" fontSize="large">
          주문 내역
        </Text>
        <OrderListSection />
      </Content>
    </BaseLayout>
  );
};
