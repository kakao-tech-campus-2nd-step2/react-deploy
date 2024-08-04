import { rest } from 'msw';

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'password1234';

type RegisterResponse = {
  message: string;
}

type LoginRequest = {
  email: string;
  password: string;
}

type LoginResponse = {
  token: string;
}

export const authMockHandler = [
  rest.post<RegisterResponse>(`/api/members/register`, async (_, res, ctx) => {
    alert('회원가입이 완료되었습니다.');
    return res(ctx.status(201), ctx.json({ message: 'User registered successfully' }));
  }),
  rest.post<LoginResponse>('https://api.example.com/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json<LoginRequest>();

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      return res(ctx.status(200), ctx.json({ token: 'fake-token' }));
    }

    return res(ctx.status(403), ctx.json({ message: 'Invalid email or password' }));
  }),
];
