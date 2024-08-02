import { GetProductsRequest, GetWishesRequest } from '@internalTypes/requestTypes';

const API_BASE_KAKAO = '/api/v1';
const API_BASE = '/api';

export const CATEGORIES_PATHS = {
  CATEGORIES: `${API_BASE}/categories`,
};

export const MEMBERS_PATHS = {
  REGISTER: `${API_BASE}/members/register`,
  LOGIN: `${API_BASE}/members/login`,
};

export const PRODUCTS_PATHS = {
  PRODUCTS: (params: GetProductsRequest) =>
    `${API_BASE}/products?page=${params.page}&size=${params.size}&sort=${params.sort}&categoryId=${params.categoryId}`,
  PRODUCTS_DETAIL: (productId?: string) => `${API_BASE}/products/${productId}`,
  PRODUCTS_OPTIONS: (productId?: string) => `${API_BASE}/products/${productId}/options`,
};

export const RANKING_PATHS = {
  PRODUCTS: `${API_BASE_KAKAO}/ranking/products`,
};

export const WISH_PATHS = {
  GET_WISH: (params: GetWishesRequest) =>
    `${API_BASE}/wishes?page=${params.page}&size=${params.size}&sort=${params.sort}`,
  ADD_WISH: `${API_BASE}/wishes`,
  DELETE_WISH: `${API_BASE}/wishes`,
};

export const ORDER_PATHS = {
  ORDERS: `${API_BASE}/orders`,
};

export const POINT_PATHS = {
  GET_POINT: `${API_BASE}/points`,
};
