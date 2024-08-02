import { useMutation, type UseMutationResult } from '@tanstack/react-query';

import { fetchInstance } from '../instance';

type WishRequestParams = {
  productId: number;
};

// type WishResponseParams = null;

// type WishResponseData = WishResponseParams;

// export const getProductsPath = ({ categoryId, pageToken, maxResults }: RequestParams) => {
//   const params = new URLSearchParams();

//   params.append('categoryId', categoryId);
//   params.append('sort', 'name,asc');
//   if (pageToken) params.append('page', pageToken);
//   if (maxResults) params.append('size', maxResults.toString());

//   return `${BASE_URL}/api/products?${params.toString()}`;
// };

const postWish = async (params: WishRequestParams) => {
  try {
    const response = await fetchInstance.post(`/api/wishes`, params);

    const status = response.status;
    console.log('HTTP status: ', status);

    return null;
  } catch (error) {
    console.log('error posting wish', error);
    throw error;
  }
};

export const usePostWish = (): UseMutationResult<null, Error, WishRequestParams> => {
  return useMutation({
    mutationFn: (params: WishRequestParams) => postWish(params),
  });

  // 사용 시 mutation으로 사용
};
