import { css } from '@emotion/react';

import { useState } from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { useWishList } from '@/api/hooks/useWishList';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Container } from '@/components/ui/Layout/Container';

import { WishListItem } from './WishListItem';

export const WishList = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wishList, status, error, refetch } = useWishList({});

  const handleCloseAlert = () => {
    onClose();
    refetch();
  };

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  if (status === 'pending') {
    return <UpDownDots />;
  }

  if (!wishList?.length) {
    return <OneTextContainer>위시 상품이 없습니다.</OneTextContainer>;
  }

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      {wishList.map((wish) => (
        <WishListItem
          key={wish.wishId}
          wish={wish}
          onOpenAlert={onOpen}
          setAlertMessage={setAlertMessage}
        />
      ))}
      {isOpen && (
        <Alert
          message={alertMessage}
          isOpen={isOpen}
          onClose={handleCloseAlert}
        />
      )}
    </Container>
  );
};

const containerStyle = css({
  maxHeight: '26em',
  overflowY: 'scroll',
});
