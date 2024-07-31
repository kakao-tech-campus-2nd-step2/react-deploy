import { GetProductsRequest } from '@internalTypes/requestTypes';

const API_BASE_KAKAO = 'api/v1';
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
  PRODUCTS_OPTIONS: (productId?: string) => `${API_BASE_KAKAO}/products/${productId}/options`,
};

export const RANKING_PATHS = {
  PRODUCTS: `${API_BASE_KAKAO}/ranking/products`,
};

export const THEME_PATHS = {
  THEMES: `${API_BASE_KAKAO}/themes`,
  THEME_PRODUCTS: (themeKey?: string) => `${API_BASE}/themes/${themeKey}/products`,
};

export const WISH_PATHS = {
  ADD_WISH: `${API_BASE}/wishes`,
  GET_WISH: `${API_BASE}/wishes`,
  DELETE_WISH: `${API_BASE}/wishes`,
};
