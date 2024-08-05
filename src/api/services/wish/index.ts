import { AxiosError } from 'axios';

import { AUTHROIZATION_API } from '@/api/config';

import {
  WishListRequestParams,
  WishListResponse,
  WishListResponseRaw,
} from './types';

type WishRequestBody = {
  productId: number;
};

export const addWish = async ({ productId }: WishRequestBody) => {
  try {
    const response = await AUTHROIZATION_API.post('/api/wishes', {
      productId,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const res = error.response;

      if (res?.status === 400 || res?.status === 404) {
        throw new Error(res.data.detail);
      }

      if (res?.status === 403) {
        throw new Error('로그인 후 이용해주세요.');
      }
    }

    throw new Error('위시 리스트에 추가하는 데 실패했습니다.');
  }
};

export const fetchWishList = async (
  params: WishListRequestParams
): Promise<WishListResponse> => {
  try {
    const response = await AUTHROIZATION_API.get<WishListResponseRaw>(
      getWishListPath(params)
    );
    const { data } = response;

    return {
      wishList: data.content,
      nextPageToken:
        data.page !== data.totalPages - 1
          ? (data.page + 1).toString()
          : undefined,
      pageInfo: {
        totalResults: data.totalElements,
        resultsPerPage: data.size,
      },
    };
  } catch (error) {
    throw new Error('위시 상품 목록을 불러오는 데 실패했습니다.');
  }
};

export type DeleteWishRequestParams = {
  wishId: number;
};

export const deleteWishItem = async ({ wishId }: DeleteWishRequestParams) => {
  try {
    await AUTHROIZATION_API.delete(`/api/wishes/${wishId}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      const { response } = error;
      if (response?.status === 400 || response?.status === 404) {
        throw new Error(response.data.detail);
      }
    }
    throw new Error('위시 상품을 삭제하는 데 실패했습니다.');
  }
};

const getWishListPath = ({ pageToken, maxResults }: WishListRequestParams) => {
  const params = new URLSearchParams();

  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());

  return `/api/wishes?${params.toString()}`;
};
