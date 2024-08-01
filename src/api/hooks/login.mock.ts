import { rest } from 'msw';

import { BASE_URL } from '../instance';

type LoginMockRequest = {
  email: string;
  password: string;
};

export const loginMockHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginMockRequest;

    // 임의의 아이디와 비밀번호로 로그인 성공
    if (email === 'example@gmail.com' && password === 'example123') {
      return res(
        ctx.status(200),
        ctx.json({
          email: email,
          token: 'example-token',
        }),
      );
    }

    return res(
      ctx.status(400),
      ctx.json({
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
      }),
    );
  }),
];