import { useMutation } from '@tanstack/react-query';

import { ApiPath } from '@/routes/path';

import { fetchInstance } from '../instance';

export const addToWishList = async (token: string, productId: number): Promise<void> => {
  await fetchInstance.post(
    ApiPath.wishes.root,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const useAddToWishList = () => {
  return useMutation({
    mutationFn: (params: { token: string; productId: number }) =>
      addToWishList(params.token, params.productId),
  });
};
