import { setupWorker } from 'msw';

import { loginMockHandler } from './auth/login.mock';
import { registerMockHandler } from './auth/register.mock';
import { categoriesMockHandler } from './categories/categories.mock';
import { productOptionsMockHandler } from './product/product-options.mock';
import { productsMockHandler } from './product/products.mock';
import { AddWishListMockHandler } from './wish-list/wish-list-add.mock';
import { DeleteWishListMockHandler } from './wish-list/wish-list-delete.mock';
import { FindWishListMockHandler } from './wish-list/wish-list-find.mock';

export const worker = setupWorker(
  ...categoriesMockHandler,
  ...productsMockHandler,
  ...registerMockHandler,
  ...loginMockHandler,
  ...registerMockHandler,
  ...productOptionsMockHandler,
  ...AddWishListMockHandler,
  ...FindWishListMockHandler,
  ...DeleteWishListMockHandler,
);
