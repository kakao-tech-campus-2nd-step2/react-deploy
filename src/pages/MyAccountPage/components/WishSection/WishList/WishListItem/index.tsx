import { Dispatch, SetStateAction } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Container, IconButton, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { deleteWishItem } from '@/api/services/wish';
import { WishData } from '@/types/wishType';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';

type WishListItemProps = {
  wish: WishData;
  onOpenAlert: () => void;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

export const WishListItem = ({
  wish,
  onOpenAlert,
  setAlertMessage,
}: WishListItemProps) => {
  const { mutate } = useMutation({
    mutationFn: deleteWishItem,
    onSuccess: () => {
      setAlertMessage('위시 상품이 삭제되었습니다.');
      onOpenAlert();
    },
    onError: (e) => {
      setAlertMessage(e.message);
      onOpenAlert();
    },
  });

  const onClickDeleteButton = (wishId: number) => {
    mutate({ wishId });
  };

  return (
    <Card gap="1rem" css={{ padding: '1rem' }}>
      <Image src={wish.imageUrl} ratio="square" width="6rem" />
      <Container flexDirection="column">
        <Text as="b">{wish.productName}</Text>
        <Text>{wish.price} 원</Text>
      </Container>
      <IconButton
        variant="outline"
        aria-label="Delete wish item"
        icon={<DeleteIcon />}
        onClick={() => onClickDeleteButton(wish.wishId)}
      />
    </Card>
  );
};
