import { css } from '@emotion/react';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useDisclosure } from '@chakra-ui/react';

import { useWishList } from '@/api/hooks/useWishList';

import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Container } from '@/components/ui/Layout/Container';

import { WishListItem } from './WishListItem';

export const WishList = () => {
  const { ref, inView } = useInView();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertMessage, setAlertMessage] = useState('');

  const { wishList, status, error, hasNextPage, fetchNextPage, refetch } =
    useWishList({});

  const handleCloseAlert = () => {
    onClose();
    refetch();
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

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
      {wishList.map((wish, index) => (
        <div
          key={wish.wishId}
          ref={wishList.length === index + 1 ? ref : undefined}
        >
          <WishListItem
            wish={wish}
            onOpenAlert={onOpen}
            setAlertMessage={setAlertMessage}
          />
        </div>
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
  paddingBottom: '10rem',
});
