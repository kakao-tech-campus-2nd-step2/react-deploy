import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Card, CardBody, CardFooter, Heading, Image, Text } from '@chakra-ui/react';

import { deleteWishlist } from '@/api/hooks/useGetWishlist';
import { useAPIBaseURL } from '@/provider/APIBaseURL';

interface Props {
  id: number;
  imageURL: string;
  name: string;
  price: number;
}

export default ({ id, imageURL, name, price }: Props) => {
  const baseURL = useAPIBaseURL()[0];
  const deleteWish = () => {
    deleteWishlist(String(id), baseURL).then((result) => {
      if (!result) alert('관심 삭제 실패');
    });
  };
  return (
    <Card
      width="100%"
      marginBottom="10px"
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '200px' }}
        src={imageURL}
        alt="Caffe Latte"
      />

      <CardBody>
        <Heading size="md">{name}</Heading>

        <Text py="2">{price}원</Text>
      </CardBody>
      <CardFooter>
        <Button onClick={deleteWish} colorScheme="red" size="sm">
          <DeleteIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};
