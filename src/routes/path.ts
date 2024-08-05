export const ROUTER_PATH = {
  HOME: '/',
  CATEGORY: '/category/:categoryId',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  MY_ACCOUNT: '/my-account',
  PRODUCTSDETAIL: '/products/:productId',
  ORDER: '/order',
  KAKAO_REDIRECT: '/redirection',
  ADMIN: '/admin',
  ORDER_LIST: '/order-list',
  NOT_FOUND: '*',
};

export const getDynamicPath = {
  category: (categoryId: number) =>
    ROUTER_PATH.CATEGORY.replace(':categoryId', categoryId.toString()),
  productsDetail: (productId: number) =>
    ROUTER_PATH.PRODUCTSDETAIL.replace(':productId', productId.toString()),
};
