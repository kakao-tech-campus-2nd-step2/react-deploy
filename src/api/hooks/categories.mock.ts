import { rest } from "msw";

import { getCategoriesPath } from "./useGetCategorys";

export const categoriesMockHandler = [
  rest.get(getCategoriesPath(), (_, res, ctx) => {
    return res(ctx.json(CATEGORIES_RESPONSE_DATA));
  }),
];

const CATEGORIES_RESPONSE_DATA = [
  {
    id: 2920,
    name: "생일",
    description: "감동을 높여줄 생일 선물 리스트",
    color: "#5949a3",
    imageUrl: "",
  },
  {
    id: 2930,
    name: "교환권",
    description: "놓치면 후회할 교환권 특가",
    color: "#9290C3",
    imageUrl: "",
  },
];
