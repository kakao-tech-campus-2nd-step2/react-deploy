import { setupWorker } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { interestHandlers } from '@/api/hooks/interest.mock';
import { kakaoLoginMockHandler, loginMockHandler } from '@/api/hooks/login.mock';
import { orderHandlers } from '@/api/hooks/order.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';
import { signupHandler } from '@/api/hooks/signup.mock';

export const worker = setupWorker(...categoriesMockHandler, ...interestHandlers, ...loginMockHandler, ...kakaoLoginMockHandler, ...productsMockHandler, ...signupHandler, ...orderHandlers);
