import { rest } from 'msw';

export const pointMockHandlers = [
  rest.get('https://api.example.com/api/member/point', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return res(ctx.status(401));
    }

    return res(
      ctx.status(200),
      ctx.json({ point: 1000 })
    );
  }),
];