import { setupWorker } from 'msw';
import { productsMockHandler } from '@apis/products/index.mock';
import { wishMockHandler } from '@apis/wish/index.mock';
import { memberMockHandler } from '@apis/members/index.mock';
import { categoriesMockHandler } from '@apis/categories/index.mock';

export const worker = setupWorker(
  ...productsMockHandler,
  ...wishMockHandler,
  ...memberMockHandler,
  ...categoriesMockHandler,
);
