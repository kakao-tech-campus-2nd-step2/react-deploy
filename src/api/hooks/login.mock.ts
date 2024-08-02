import { rest } from 'msw';

import { BASE_URL } from '../instance';

type LoginRequestBody = {
  email: string;
  password: string;
};
export const loginHandler = [
  rest.post(`${BASE_URL}/api/members/login`, (req, res, ctx) => {
    const { email, password } = req.body as LoginRequestBody;

    // 로그인 유효성 검사
    if (email === 'test@example.com' && password === 'p123456') {
      return res(
        ctx.status(200),
        ctx.json({
          email,
          token: 'test@example.com',
        }),
      );
    } else {
      return res(ctx.status(401), ctx.json({ message: 'Invalid email or password' }));
    }
  }),
];
