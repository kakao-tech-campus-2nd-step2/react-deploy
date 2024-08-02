import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import {
  AddWishesBody,
  CategoryDeleteRequestPath,
  DeleteWishesPath,
  LoginRequestBody,
  OrderRequestBody,
} from '@/types/request';
import {
  AddWishesResponse,
  CategoryResponse,
  LoginResponse, PointResponse,
  ProductDetailResponse,
  ProductOptionsResponse,
} from '@/types/response';
import { CategoryRepository } from '@/types';
import { CategoryData, ProductData, ProductOption } from '@/dto';

export const requestOrder = (body: OrderRequestBody) => axiosInstance.post(RequestURLs.ORDER, body);

export const fetchPoint = async () => {
  try {
    const response = await axiosInstance.get<PointResponse>(RequestURLs.POINT);

    return response.data.point;
  } catch (e) {
    return 0;
  }
};

export const addWishProduct = async (body: AddWishesBody) => {
  const response = await axiosInstance.post<AddWishesResponse>(RequestURLs.WISHES, body);

  return response.data;
};

export const deleteWishProduct = (path: DeleteWishesPath) => {
  const url = replacePathParams(RequestURLs.DELETE_WISHES, {
    wishId: path.wishId.toString(),
  });

  return axiosInstance.delete(url);
};

export const requestAuth = async (body: LoginRequestBody, authType: 'login' | 'register') => {
  const url = authType === 'register' ? RequestURLs.REGISTER : RequestURLs.LOGIN;
  const response = await axiosInstance.post<LoginResponse>(url, body);

  if (response && response.data) return response.data;

  return null;
};

export const deleteCategory = ({ categoryId }: CategoryDeleteRequestPath) => axiosInstance.delete(
  replacePathParams(
    RequestURLs.DELETE_CATEGORY,
    {
      categoryId: categoryId.toString(),
    },
  ),
);

export const addCategory = (category: Omit<CategoryData, 'id'>) => axiosInstance.post(RequestURLs.CATEGORY, category);

export const fetchCategories = async () => {
  const response = await axiosInstance.get<CategoryResponse>(RequestURLs.CATEGORY);
  const tmpCategories: CategoryRepository = {};

  if (response.data) {
    response.data.forEach((category) => {
      tmpCategories[category.id] = category;
    });
  }

  return tmpCategories;
};

export const fetchProductDetail = async ({ productId }: { productId: string }) => {
  const endpoint = replacePathParams(RequestURLs.PRODUCT_DETAILS, { productId });
  const response = await axiosInstance.get<ProductDetailResponse>(endpoint);

  if (!response.data) return {} as ProductData; // productData를 받아올 때 에러가 발생한 경우 상위에서 catch됨

  return response.data as ProductData;
};

export const fetchProductOptions = async ({ productId } : { productId: string }) => {
  const endpoint = replacePathParams(RequestURLs.PRODUCT_OPTIONS, { productId });
  const response = await axiosInstance.get<ProductOptionsResponse>(endpoint);

  if (!response.data) return [];

  return response.data as ProductOption[];
};
