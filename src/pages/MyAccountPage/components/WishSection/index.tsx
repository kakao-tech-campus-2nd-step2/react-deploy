import { Text } from '@chakra-ui/react';

import { Container } from '@/components/ui/Layout/Container';

import { WishList } from './WishList';

export const WishSection = () => {
  return (
    <Container flexDirection="column" gap="1rem">
      <Text as="b" fontSize="large">
        나의 위시
      </Text>
      <WishList />
    </Container>
  );
};
