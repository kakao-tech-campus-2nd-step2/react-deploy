import { rest } from 'msw';

import { BASE_URL } from '../instance';

type SignupMockRequest = {
  email: string;
  password: string;
};

const usersDatabase: { email: string, password: string }[] = [
  { email: 'example@gmail.com', password: 'example123' },
];

export const signupHandler = [
  rest.post(`${BASE_URL}/api/members/register`, (req, res, ctx) => {
    const { email, password } = req.body as SignupMockRequest;

    // 이미 존재하는 사용자인지 확인
    const isExistingUser = usersDatabase.find((user) => user.email=== email);
    if (isExistingUser) {
      return res(ctx.status(400), ctx.json({ message: '이미 사용 중인 이메일입니다.' }));
    }

    // 사용자 추가
    usersDatabase.push({ email, password });
    
    // 디버깅용 로그
    console.log('usersDatabase:', usersDatabase);

    // 회원가입 성공
    return res(ctx.status(200), ctx.json({ email: email, token: 'example-token' })); 
  }),
];