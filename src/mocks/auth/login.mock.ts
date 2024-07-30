import { rest } from 'msw';

import { getLoginPath } from '@/api/hooks/auth/login.api';
import type { UserRequestData, UserResponseData } from '@/api/hooks/auth/type';

export const loginMockHandler = [
  rest.post(getLoginPath(), (req, res, ctx) => {
    const { email, password } = req.body as UserRequestData;

    if (email === '123' && password === '123') {
      const mockResponse: UserResponseData = {
        email,
        token: 'mock-token',
      };

      return res(ctx.status(200), ctx.json(mockResponse));
    }

    return res(ctx.status(403), ctx.json({ error: 'Invalid email or password' }));
  }),
];
