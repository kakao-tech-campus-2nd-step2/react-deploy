import { fetchInstance, BASE_URL } from '../instance';
import { authSessionStorage } from '@/utils/storage';
type AddWishParams = {
  productId: number;
  token: string;
};

export const addWish = async ({ productId, token }: AddWishParams) => {
  console.log(token);
  const storedAuthInfo = authSessionStorage.get();
      console.log('Stored auth info:', storedAuthInfo);
  const response = await fetchInstance.post(
    '/api/wishes',
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const fetchWishlist = async (token: string) => {
  const response = await fetch(`${BASE_URL}/api/wishes?page=0&size=10&sort=createdDate,desc`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  return response.json();
};

export const deleteWish = async (wishId: number, token: string) => {
  const response = await fetch(`${BASE_URL}/api/wishes/${wishId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete wish');
  }
};
