import { rest } from 'msw';

interface User {
  email: string;
  password: string;
  token?: string;
}

const userMockList: User[] = [
  {
    email: 'test@example.com',
    password: 'password1234',
    token: 'mock-token',
  },
];

export const membersMockHandlers = [
  rest.post('/api/members/login', async (req, res, ctx) => {
    try {
      const { email, password } = await req.json();

      if (!email || !password) {
        return await res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
      }

      const existingUser = userMockList.find((user) => user.email === email);
      if (!existingUser) {
        userMockList.push({ email, password, token: 'new-mock-token' });
        return await res(ctx.status(201), ctx.json({ message: 'User created successfully' }));
      }

      if (existingUser.password === password) {
        return await res(
          ctx.status(200),
          ctx.json({ email: existingUser.email, token: existingUser.token }),
        );
      } else {
        return await res(ctx.status(401), ctx.json({ message: 'Unauthorized' }));
      }
    } catch (error) {
      return res(ctx.status(500), ctx.json({ message: 'Server error' }));
    }
  }),
];
