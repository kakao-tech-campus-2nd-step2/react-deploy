import { useState } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { IconButton, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { useWishList } from '@/api/hooks/useWishList';
import { deleteWishItem } from '@/api/services/wish';

import { Card } from '@/components/Card';
import { UpDownDots } from '@/components/Loading/UpDownDots';
import { OneTextContainer } from '@/components/OneTextContainer';
import { Alert } from '@/components/ui/Dialog/Alert';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';

export const WishList = () => {
  const [alertMessage, setAlertMessage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wishList, status, error, refetch } = useWishList({});
  const { mutate } = useMutation({
    mutationFn: deleteWishItem,
    onSuccess: () => {
      setAlertMessage('위시 상품이 삭제되었습니다.');
      onOpen();
    },
    onError: (e) => {
      setAlertMessage(e.message);
      onOpen();
    },
  });

  const handleCloseAlert = () => {
    onClose();
    refetch();
  };

  const onClickDeleteButton = (wishId: number) => {
    mutate({ wishId });
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
    <Container
      flexDirection="column"
      gap="0.5rem"
      maxWidth="52rem"
      css={{ width: '70vw', paddingBottom: '10rem' }}
    >
      {wishList.map((wish) => (
        <Card key={wish.wishId} gap="1rem" css={{ padding: '1rem' }}>
          <Image src={wish.imageUrl} ratio="square" width="6rem" />
          <Container flexDirection="column">
            <Text css={{ fontWeight: 500 }}>{wish.productName}</Text>
            <Text>{wish.price} 원</Text>
          </Container>
          <IconButton
            variant="outline"
            aria-label="Delete wish item"
            icon={<DeleteIcon />}
            onClick={() => onClickDeleteButton(wish.wishId)}
          />
        </Card>
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
