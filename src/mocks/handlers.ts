//import { rest } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

//import { interestHandlers } from './interestHandlers';
export const handlers = [
  ...categoriesMockHandler,
  ...productsMockHandler,
  // ...interestHandlers,

  // // 회원가입 핸들러 추가
  // rest.post('/api/signup', (_, res, ctx) => {
  //   return res(ctx.status(201));
  // }),

  // // 로그인 핸들러 추가
  // rest.post('/api/login', (req, res, ctx) => {
  //   const { name } = req.body as { name: string; password: string };
  //   return res(ctx.status(200), ctx.json({ token: `token-for-${name}` }));
  // }),
];
