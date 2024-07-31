import { fetchInstance } from './instance';

export const addWish = async (productId: number) => {
  try {
    const response = await fetchInstance.post('/api/wishes', { productId });
    return response.status === 201;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 등록 중 오류가 발생했습니다.');
  }
};

export const getWishList = async () => {
  try {
    const response = await fetchInstance.get('/api/wishes');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 상품 목록 조회 중 오류가 발생했습니다.');
  }
};

export const removeWish = async (wishId: number) => {
  try {
    const response = await fetchInstance.delete(`/api/wishes/${wishId}`);
    return response.status === 204;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 상품 삭제 중 오류가 발생했습니다.');
  }
};
