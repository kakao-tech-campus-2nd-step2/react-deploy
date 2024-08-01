import { useQuery } from '@tanstack/react-query';

import { BASE_URL, fetchInstance } from '../instance';

const wishPath = `${BASE_URL}/api/wishes`;

const wishList = async () => {
  const response = await fetchInstance.get(wishPath);
  return response.data;
};

export const userWishList = () =>
  useQuery({
    queryKey: ['wishList', wishPath],
    queryFn: async () => await wishList(),
  });
