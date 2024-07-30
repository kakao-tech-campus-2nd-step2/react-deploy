import { setupServer } from 'msw/node';

import { loginMockHandler } from './auth/login.mock';
import { registerMockHandler } from './auth/register.mock';
import { categoriesMockHandler } from './categories/categories.mock';
import { productOptionsMockHandler } from './product/product-options.mock';
import { productsMockHandler } from './product/products.mock';
import { getWishListMockHandler } from './wish-list/wishList.mock';

export const server = setupServer(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerMockHandler,
  ...loginMockHandler,
  ...registerMockHandler,
  ...productOptionsMockHandler,
  ...getWishListMockHandler,
);
