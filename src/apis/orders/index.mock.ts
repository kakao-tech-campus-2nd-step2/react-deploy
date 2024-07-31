import { rest } from 'msw';
import { ORDER_PATHS } from '@apis/path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const orderMockHandler = [
  rest.post(`${BASE_URL}${ORDER_PATHS.ORDERS}`, async (req, res, ctx) => {
    const { optionId, quantity, message } = await req.json();

    return res(
      ctx.status(201),
      ctx.json({
        id: 1,
        optionId,
        quantity,
        orderDateTime: new Date().toISOString(),
        message,
      }),
    );
  }),
];
