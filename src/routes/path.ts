export const RouterPath = {
  root: '/',
  home: '/',
  category: '/category/:categoryId',
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
  order: '/order',
  login: '/login',
  kakaoCallback: '/oauth/kakao/callback',
  notFound: '*',
};

export const getDynamicPath = {
  category: (categoryId: string) => RouterPath.category.replace(':categoryId', categoryId),
  login: (redirect?: string) => {
    const currentRedirect = redirect ?? window.location.href;
    return `${RouterPath.login}?redirect=${encodeURIComponent(currentRedirect)}`;
  },
  productsDetail: (goodsId: number | string) =>
    RouterPath.productsDetail.replace(
      ':productId',
      typeof goodsId === 'number' ? goodsId.toString() : goodsId,
    ),
  kakaoCallback: (code: string) => `${RouterPath.kakaoCallback}?code=${encodeURIComponent(code)}`, // 다이내믹 경로 생성을 위한 함수 추가
};
