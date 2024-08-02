import { Text } from '@chakra-ui/react';

import { Container } from '@/components/ui/Layout/Container';

import { WishList } from './WishList';

export const WishSection = () => {
  return (
    <Container
      flexDirection="column"
      gap="1rem"
      maxWidth="52rem"
      css={{ width: '70vw' }}
    >
      <Text as="b" fontSize="large">
        나의 위시
      </Text>
      <WishList />
    </Container>
  );
};
