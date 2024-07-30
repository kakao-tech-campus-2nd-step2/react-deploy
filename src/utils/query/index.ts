import { axiosInstance, replacePathParams } from '@utils/network';
import RequestURLs from '@constants/RequestURLs';
import {
  AddWishesBody,
  CategoryDeleteRequestPath,
  DeleteWishesPath,
  LoginRequestBody,
} from '@/types/request';
import {
  AddWishesResponse,
  CategoryResponse,
  LoginResponse,
  ProductDetailResponse,
  ProductOptionsResponse,
} from '@/types/response';
import { CategoryRepository } from '@/types';
import { CategoryData, ProductData, ProductOption } from '@/dto';

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

  return response.data;
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

  return response.data as ProductData;
};

export const fetchProductOptions = async ({ productId } : { productId: string }) => {
  const endpoint = replacePathParams(RequestURLs.PRODUCT_OPTIONS, { productId });
  const response = await axiosInstance.get<ProductOptionsResponse>(endpoint);

  return response.data as ProductOption[];
};
