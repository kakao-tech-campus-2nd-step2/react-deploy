import type { AxiosError } from 'axios';

import { getCategoriesPath } from '@/api/hooks/useGetCategorys';
import { getProductDetailPath } from '@/api/hooks/useGetProductDetail';
import { getProductOptionsPath } from '@/api/hooks/useGetProductOptions';
import { getProductsPath } from '@/api/hooks/useGetProducts';
import { fetchInstance } from '@/api/instance';
import type {
  AddToWishlistResponse,
  CategoryResponseData,
  LoginUserRequest,
  LoginUserResponse,
  PaginationResponseData,
  ProductDetailRequestParams,
  ProductDetailResponseData,
  ProductOptionsResponseData,
  ProductRequestParams,
  RegisterUserRequest,
  RegisterUserResponse,
  UserPointResponse,
} from '@/api/types';
import type { OrderListRequestParams } from '@/api/types';
import type { CreateOrderRequestParams } from '@/api/types';
import type { CommonResponse } from '@/api/types';
import type { WishlistItem } from '@/components/features/MyAccount/WhishList';
import type { OrderData, ProductData } from '@/types';
import type { ProductOptionsData } from '@/types';

export const errorMessages: {
  [key: string]: (task: string) => string;
} = {
  unknown: (task: string) => `알 수 없는 이유로 ${task}에 실패했습니다. 잠시 후 다시 시도해 주세요`,
};

export const registerUser = async ({
  email,
  password,
}: RegisterUserRequest): Promise<RegisterUserResponse> => {
  try {
    const response = await fetchInstance.post('/api/members/register', {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw new Error(
      (error as AxiosError<CommonResponse>).response?.data?.message ??
        errorMessages.unkown('회원가입'),
    );
  }
};

export const loginUser = async ({
  email,
  password,
}: LoginUserRequest): Promise<LoginUserResponse> => {
  try {
    const response = await fetchInstance.post('/api/members/login', {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw new Error(
      (error as AxiosError<CommonResponse>).response?.data?.message ??
        errorMessages.unknown('로그인'),
    );
  }
};

export const kakaoLoginUser = async (): Promise<LoginUserResponse> => {
  try {
    const response = await fetchInstance.get('/api/oauth/login/kakao');
    const { token } = response.data;
    localStorage.setItem('token', token);

    return response.data;
  } catch (error) {
    throw new Error('카카오 로그인에 실패했습니다.');
  }
};

export const getPoints = async (): Promise<UserPointResponse> => {
  try {
    const response = await fetchInstance.get('/api/members/points');

    return response.data;
  } catch (error) {
    throw new Error('포인트 조회에 실패했습니다.');
  }
};

export const getCategories = async (): Promise<CategoryResponseData> => {
  const response = await fetchInstance.get(getCategoriesPath());

  return response.data;
};

export const getProducts = async (
  params: ProductRequestParams,
): Promise<PaginationResponseData<ProductData>> => {
  const response = await fetchInstance.get(getProductsPath(params));
  const data = response.data;

  return {
    contents: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

export const getProductDetail = async (
  params: ProductDetailRequestParams,
): Promise<ProductDetailResponseData> => {
  const response = await fetchInstance.get(getProductDetailPath(params.productId));

  return response.data;
};

export const getProductOptions = async (
  params: ProductDetailRequestParams,
): Promise<ProductOptionsResponseData> => {
  const response = await fetchInstance.get(getProductOptionsPath(params.productId));

  return response.data;
};

export const addToWishlist = async (productId: string): Promise<AddToWishlistResponse> => {
  try {
    const response = await fetchInstance.post('/api/wishes', { productId });

    return response.data;
  } catch (error) {
    throw new Error('위시 리스트 추가에 실패했습니다.');
  }
};

export const getWishlist = async (
  page: number,
  size: number,
): Promise<PaginationResponseData<WishlistItem>> => {
  try {
    const response = await fetchInstance.get(`/api/wishes`, {
      params: {
        page,
        size,
        sort: 'createdDate,desc',
      },
    });

    const data = response.data;

    return {
      contents: data.content,
      nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
      pageInfo: {
        totalResults: data.totalElements,
        resultsPerPage: data.size,
      },
    };
  } catch (error) {
    throw new Error('위시 리스트 조회에 실패했습니다.');
  }
};

export const deleteFromWishlist = async (productId: number): Promise<void> => {
  try {
    const response = await fetchInstance.delete(`/api/wishes/${productId}`);

    return response.data;
  } catch (error) {
    throw new Error('위시 리스트 삭제에 실패했습니다.');
  }
};

export const createOrder = async (order: CreateOrderRequestParams): Promise<OrderData> => {
  try {
    const response = await fetchInstance.post('/api/orders', order);

    return response.data;
  } catch (error) {
    throw new Error('주문하기에 실패했습니다.');
  }
};

export const getOrderList = async (
  params: OrderListRequestParams,
): Promise<PaginationResponseData<ProductOptionsData>> => {
  try {
    const response = await fetchInstance.get('/api/orders', {
      params: params,
    });
    const data = response.data;

    return {
      contents: data.content,
      nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
      pageInfo: {
        totalResults: data.totalElements,
        resultsPerPage: data.size,
      },
    };
  } catch (error) {
    throw new Error('주문 목록 조회에 실패했습니다.');
  }
};
