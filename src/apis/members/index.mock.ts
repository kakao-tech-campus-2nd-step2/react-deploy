import { rest } from 'msw';
import { MEMBERS_PATH } from './path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const memberMockHandler = [
  rest.post(`${BASE_URL}${MEMBERS_PATH.REGISTER}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ access_token: '1234' })),
  ),
];
