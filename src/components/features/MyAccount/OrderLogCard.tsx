import { Card, Flex, Image, Text } from '@chakra-ui/react';

export type OrderLog = {
  imageUrl: string;
  name: string;
  count: number;
  price: number;
};

type OrderLogCardProps = {
  item: OrderLog;
} & React.HTMLAttributes<HTMLDivElement>;

const OrderLogCard = ({ item, ...props }: OrderLogCardProps) => {
  return (
    <Card
      {...props}
      w="100%"
      flexDir="row"
      p="5"
      mt="5"
      borderWidth="1px"
      borderColor="#eeeeee"
      shadow="sm"
    >
      <Image w="90px" aspectRatio="1/1" src={item.imageUrl} />
      <Flex w="100%" flexDir="column" ml="2">
        <Text fontSize="lg">
          {item.name} x {item.count}개
        </Text>
        <Text my="auto" fontSize="xl" color="gray.500">
          {item.price} 원
        </Text>
      </Flex>
    </Card>
  );
};

export default OrderLogCard;
