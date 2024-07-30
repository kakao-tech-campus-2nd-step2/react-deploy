import { setupServer } from 'msw/node';
import { productsMockHandler } from '@apis/products/index.mock';
import { wishMockHandler } from '@apis/wish/index.mock';
import { memberMockHandler } from '@apis/members/index.mock';

export const server = setupServer(...productsMockHandler, ...wishMockHandler, ...memberMockHandler);
