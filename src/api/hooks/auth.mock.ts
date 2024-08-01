import { rest } from 'msw';

const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = 'password1234';

export const authMockHandler = [
  rest.post('https://api.example.com/api/members/register', async (_, res, ctx) => {
    return res(ctx.status(201), ctx.text('User registered successfully'));
  }),
  rest.post('https://api.example.com/api/members/login', async (req, res, ctx) => {
    const { email, password } = await req.json<{ email: string; password: string }>();

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      return res(ctx.status(200), ctx.text('token'));
    }

    return res(ctx.status(403), ctx.text('Invalid email or password'));
  }),
];
