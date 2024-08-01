import { fetchInstance } from './instance';

const BASE_PATH = '/api/wishes';

export const addWish = async (productId: number) => {
  try {
    const response = await fetchInstance.post(`${BASE_PATH}`, { productId });
    return response.status === 201;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 등록 중 오류가 발생했습니다.');
  }
};

export const getWishList = async () => {
  try {
    const response = await fetchInstance.get(`${BASE_PATH}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 상품 목록 조회 중 오류가 발생했습니다.');
  }
};

export const removeWish = async (wishId: number) => {
  try {
    const response = await fetchInstance.delete(`${BASE_PATH}/${wishId}`);
    return response.status === 204;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 상품 삭제 중 오류가 발생했습니다.');
  }
};
