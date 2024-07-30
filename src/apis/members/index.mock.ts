import { rest } from 'msw';
import { MEMBERS_PATHS } from '@apis/path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const memberMockHandler = [
  rest.post(`${BASE_URL}${MEMBERS_PATHS.REGISTER}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ access_token: '1234' })),
  ),
  rest.post(`${BASE_URL}${MEMBERS_PATHS.LOGIN}`, (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ access_token: '1234' })),
  ),
];
