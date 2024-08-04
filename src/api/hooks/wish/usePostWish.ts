import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import { fetchInstance } from '../../instance';

type WishRequestParams = {
  productId: number;
};

type ErrorResponse = {
  detail: string;
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

const token = authSessionStorage.get();

const postWish = async (params: WishRequestParams, navigate: ReturnType<typeof useNavigate>) => {
  try {
    const response = await fetchInstance.post(`/api/wishes`, params, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('wish posted!');
    } else {
      console.log('성공은 했는데 200은 아닌: ', response.status);
    }

    return null;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      // 서버 응답이 있는 경우
      console.log('Error status:', axiosError.response.status);
      console.log('Error data:', axiosError.response.data);

      if (axiosError.response.status === 401 || 404) {
        if (confirm(`로그인이 필요한 메뉴입니다.\n로그인하시겠습니까?`)) {
          navigate(RouterPath.login);
        }
      }
    } else if (axiosError.request) {
      // 요청이 전송되었지만 응답이 없는 경우
      console.log('No response received:', axiosError.request);
    } else {
      // 요청 설정 중에 발생한 에러
      console.log('Error message:', axiosError.message);
    }
    throw error;
  }
};

export const usePostWish = (): UseMutationResult<null, Error, WishRequestParams> => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (params: WishRequestParams) => postWish(params, navigate),
  });
};
