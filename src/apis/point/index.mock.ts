import { rest } from 'msw';
import { POINT_PATHS } from '../path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const pointMockHandler = [
  rest.get(`${BASE_URL}${POINT_PATHS.GET_POINT}`, (_, res, ctx) => res(ctx.json({ point: 1000 }))),
];
