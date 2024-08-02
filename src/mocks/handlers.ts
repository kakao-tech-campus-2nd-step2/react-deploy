import { rest } from 'msw';

import { categoriesMockHandler } from '@/api/hooks/categories.mock';
import { productsMockHandler } from '@/api/hooks/products.mock';

//가상 데이터베이스
const userDatabase: { email: string; password: string }[] = [];

export const handlers = [
  ...categoriesMockHandler,
  ...productsMockHandler,

  // 회원가입 핸들러 추가
  rest.post('/api/members/register', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res(ctx.status(400), ctx.json({ message: '이메일과 비밀번호를 입력해주세요 ' }));
    }

    //가상 데이터베이스에 사용자 정보 저장
    userDatabase.push({ email, password });
    console.log('회원가입 사용자 정보 저장완', { email, password });

    //성공 응답 예제
    return res(
      ctx.status(201),
      ctx.json({
        token: '가입 성공 토큰',
      }),
    );
  }),

  // 로그인 핸들러
  rest.post('/api/members/login', (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };
    console.log('로그인 핸들러 콘솔');
    console.log('로그인 요청 데이터:', { email, password });

    const loginUser = userDatabase.find(
      (user) => user.email === email && user.password === password,
    );

    //성공시
    if (loginUser) {
      console.log('로그인 성공:', loginUser);
      return res(
        ctx.status(200),
        ctx.json({
          token: '로그인 성공 토큰',
        }),
      );
    } else {
      console.log('로그인 실패: 사용자 정보 불일치');
      //실패시
      return res(
        ctx.status(405),
        ctx.json({ message: '로그인에 실패했습니다. 아이디나 비밀번호를 확인해주세요' }),
      );
    }
  }),
];
