export const RouterPath = {
  root: '/',
  home: '/',
  category: '/category/:categoryId',
<<<<<<< HEAD
  addProduct: '/products/add',
  addCategory: '/category/add',
  editCategory: '/category/edit/:categoryId',
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
  editProduct: '/products/edit/:productId',
=======
  myAccount: '/my-account',
  productsDetail: '/products/:productId',
>>>>>>> upstream/hehelee
  order: '/order',
  login: '/login',
  signUp: '/signUp',
  favorites: '/favorites',
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
};
