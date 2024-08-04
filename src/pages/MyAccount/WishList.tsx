import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { BASE_URL, fetchInstance } from '@/api/instance';
import { useAuth } from '@/provider/Auth';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface WishItem {
  id: number;
  product: Product;
}

// 관심 목록 가져오는 함수
const fetchWishlist = async (userId: number, token: string, page = 0, size = 10) => {
  const response = await fetchInstance.get(`${BASE_URL}/api/wishes`, {
    params: { userId, page, size },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.content;
};

const WishList = () => {
  const queryClient = useQueryClient();
  const authInfo = useAuth(); // 사용자 정보 가져오기

  // useQuery를 사용하여 관심 목록 데이터를 가져옴
  const {
    data: interestList,
    error,
    isLoading,
  } = useQuery<WishItem[]>(
    ['wishlist', authInfo?.id], // queryKey에 userId 포함
    () => fetchWishlist(Number(authInfo?.id), authInfo?.token ?? ''),
  );

  // useMutation을 사용하여 관심 목록 아이템 삭제 요청을 처리
  const removeMutation = useMutation(
    (id: number) =>
      fetchInstance.delete(`${BASE_URL}/api/wishes/${id}`, {
        headers: {
          Authorization: `Bearer ${authInfo?.token}`,
        },
      }),
    {
      onSuccess: () => {
        // 성공 시 관심 목록 데이터를 무효화하고 다시 가져옴
        queryClient.invalidateQueries('wishlist');
      },
      onError: () => {
        alert('삭제 실패');
      },
    },
  );

  const handleRemoveClick = async (id: number) => {
    removeMutation.mutate(id);
  };

  // 로딩 상태 처리
  if (isLoading) return <div>Loading....</div>;

  // 에러 상태 처리
  if (error) return <div>Error loading wishlist</div>;

  return (
    <VStack spacing={4} align="stretch">
      {interestList?.map((item) => (
        <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" padding="4">
          <Image src={item.product.imageUrl} alt={`Product ${item.product.name}`} />
          <Text fontWeight="bold">{item.product.name}</Text>
          <Text>{item.product.price}원</Text>
          <Button colorScheme="red" onClick={() => handleRemoveClick(item.id)}>
            관심 삭제
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default WishList;
