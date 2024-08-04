import { rest } from 'msw';
import { BASE_URL } from '../instance';
import { authSessionStorage } from '@/utils/storage';

export const loginMockHandler = [
  rest.get(`${BASE_URL}/kakao/login`, (req, res, ctx) => {
    // 카카오 로그인 성공 후, 서버에서 토큰 발급
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-kakao-token',
      })
    );
  }),
];
