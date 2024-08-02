import { rest } from "msw";

import type { WishItem } from "@/pages/MyAccount";
import { PRODUCTS_MOCK_DATA } from "./products.mock";

const wishesDatabase: WishItem[] = []; // WishItem 형식으로 변경
let nextId = 1;
export const interestHandlers = [
  // 관심 목록에 추가
  rest.post("/api/wishes/products/:productId", (req, res, ctx) => {
    const { productId } = req.params;
    const product = PRODUCTS_MOCK_DATA.content.find(
      (item) => item.id === Number(productId)
    );

    // 유효성 검사: productId에 해당하는 상품이 존재하는지 확인
    if (!product) {
      console.log(productId);
      return res(ctx.status(404), ctx.json({ message: "Product not found" }));
    }

    const newWish = {
      id: nextId++, // 고유 ID 할당
      product,
    };

    wishesDatabase.push(newWish);
    console.log(newWish);

    return res(ctx.status(201), ctx.json(newWish));
  }),

  // 관심 목록 리스트 불러오기
  rest.get("/api/wishes", (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "0");
    const size = parseInt(req.url.searchParams.get("size") || "10");
    const totalElements = wishesDatabase.length;
    const totalPages = Math.ceil(totalElements / size);

    const start = page * size;
    const end = start + size;
    const content = wishesDatabase.slice(start, end);

    return res(
      ctx.status(200),
      ctx.json({
        content,
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: page,
          pageSize: size,
          offset: start,
          unpaged: false,
          paged: true,
        },
        totalPages,
        totalElements,
        last: page === totalPages - 1,
        number: page,
        size,
        numberOfElements: content.length,
        first: page === 0,
        empty: content.length === 0,
      })
    );
  }),

  // 위시 삭제 핸들러 추가
  rest.delete("/api/wishes/:wishId", (req, res, ctx) => {
    const { wishId } = req.params;
    const wishIndex = wishesDatabase.findIndex(
      (wish) => wish.id === Number(wishId)
    );

    if (wishIndex === -1) {
      return res(ctx.status(404), ctx.json({ message: "Wish not found" }));
    }

    wishesDatabase.splice(wishIndex, 1); // 위시 삭제
    return res(ctx.status(204)); // 성공 응답
  }),
];
