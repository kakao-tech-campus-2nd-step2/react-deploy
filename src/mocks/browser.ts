import { setupWorker } from 'msw';

import { loginMockHandler } from './auth/login.mock';
import { registerMockHandler } from './auth/register.mock';
import { categoriesMockHandler } from './categories/categories.mock';
import { productOptionsMockHandler } from './product/product-options.mock';
import { productsMockHandler } from './product/products.mock';
import { getWishListMockHandler } from './wish-list/wishList.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerMockHandler,
  ...loginMockHandler,
  ...registerMockHandler,
  ...productOptionsMockHandler,
  ...getWishListMockHandler,
);
