import { rest } from 'msw';

type PointResponse = {
  point: number;
}

export const pointMockHandlers = [
  rest.get('https://api.example.com/api/member/point', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return res(ctx.status(401));
    }

    return res(ctx.status(200), ctx.json<PointResponse>({ point: 1000 }));
  }),
];
