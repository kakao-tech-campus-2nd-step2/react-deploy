import { useMutation } from '@tanstack/react-query';

import { BASE_URL, fetchAuthInstance } from '../instance';
import type { ProductDetailRequestParams } from './useGetProductDetail';

type Props = ProductDetailRequestParams;

export const addWishListPath = () => `${BASE_URL}/api/wishes`;

export const addWishList = async ({ productId }: Props) => {
  return fetchAuthInstance.post(addWishListPath(), {
    productId: productId,
  });
};

export const useAddWishList = ({ productId }: Props) => {
  return useMutation({
    mutationFn: () => addWishList({ productId }),
    onSuccess: () => {
      alert('관심 등록 완료');
    },
    onError: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      console.log(error.response.data.message);
    },
  });
};
