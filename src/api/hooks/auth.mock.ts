// authMockHandler.ts
import { rest } from 'msw';

import { BASE_URL } from '@/api/instance/index';

import { getLoginPath } from './useGetLogin';

export const authMockHandler = [
  rest.post(getLoginPath(), (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email === '1234@kakao.com' && password === '1234') {
      return res(ctx.status(200), ctx.json(LOGIN_RESPONSE_SUCCESS));
    } else {
      return res(ctx.status(401), ctx.json(LOGIN_RESPONSE_ERROR));
    }
  }),
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email && password) {
      return res(
        ctx.status(201),
        ctx.json({
          email: email,
          token: 'abcdefg',
        }),
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          message: 'Invalid input.',
        }),
      );
    }
  }),
];

const LOGIN_RESPONSE_SUCCESS = {
  email: '1234@kakao.com',
  token: 'abcdefg',
};

const LOGIN_RESPONSE_ERROR = {
  errorCode: 'InvalidCredentials',
  message: '유효하지 않은 이메일(또는 비밀번호)입니다.',
};
