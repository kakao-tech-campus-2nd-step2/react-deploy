import { fetchInstance } from './instance';

const BASE_PATH = '/api/wishes';

export const addWish = async (product_id: number) => {
  try {
    const response = await fetchInstance.post(`${BASE_PATH}`, { product_id });
    console.log('addWish response:', response); // 추가된 로그
    return response.status === 201;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('관심 등록 중 오류가 발생했습니다.');
  }
};

export const getWishList = async () => {
  try {
    const response = await fetchInstance.get(`${BASE_PATH}`);
    console.log('Fetched Wish List:', response.data); // 데이터 확인용 로그 추가
    return response.data.wishlist;
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
