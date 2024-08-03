import { rest } from "msw";

import { BASE_URL } from "../instance";

export const orderMockHandler = [
  rest.post(`${BASE_URL}/api/orders`, async (req, res, ctx) => {
    const {
      productId,
      productQuantity,
      hasCashReceipt,
      cashReceiptType,
      cashReceiptNumber,
      message,
    } = await req.json();

    console.log({
      productId,
      productQuantity,
      hasCashReceipt,
      cashReceiptType,
      cashReceiptNumber,
      message,
    });

    return res(ctx.status(200));
  }),
];
