export const RouterPath = {
  root: '/',
  home: '/',
  category: '/category/:category_id',
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
  order: '/order',
  login: '/login',
  signUp: '/signup',
  notFound: '*',
};

export const getDynamicPath = {
  category: (category_id: string) => RouterPath.category.replace(':category_id', category_id),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  productsDetail: (goodsId: number | string) =>
    RouterPath.productsDetail.replace(
      ':productId',
      typeof goodsId === 'number' ? goodsId.toString() : goodsId,
    ),
};
