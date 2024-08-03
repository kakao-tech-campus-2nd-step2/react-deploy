import { rest } from "msw";

import { BASE_URL } from "../instance";

export const pointMockHandler = [
  rest.get(`${BASE_URL}/api/points`, (_, res, ctx) => {
    const mockPointData = { point: 30000 };

    console.log("Fetching point data");

    return res(ctx.status(200), ctx.json(mockPointData));
  }),
];
