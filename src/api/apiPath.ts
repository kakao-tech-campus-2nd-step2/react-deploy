export const APIPath = {
  register: '/api/members/register',
  login: '/api/members/login',
  getAllCategories: '/api/categories',
  makeProduct: '/api/products',
  getProduct: '/api/products/:productsId',
  getAllProducts: '/api/products?page=:page&size=:size&sort=:sort&categoryId=:categoryId',
  getOption: '/api/products/:productId',
  putWish: '/api/wishes',
  deleteWish: '/api/wishes/:wishId',
  getAllWishes: '/api/wishes?page=:page&size=:size&sort=:sort',
  order: '/api/orders',
};

export const getDynamicPath = {
  getProduct: (productsId: string) => APIPath.getProduct.replace(':productsId', productsId),
};

export const getBackendAPI = () => {};
