import { rest } from "msw";

import { PRODUCTS_MOCK_DATA } from "./products.mock";

interface OrderFormData {
  productId: number;
  optionId: number;
  quantity: number;
  hasCashReceipt: boolean;
  cashReceiptType?: string;
  cashReceiptNumber?: string;
  message?: string;
  point?: number;
}

interface Order extends OrderFormData {
  id: number;
  productName: string;
  optionName: string;
  price: number;
  date: string;
  imageUrl: string;
}

let nextOrderId = 1;
const ordersDatabase: Order[] = [];
let userPoints = 100000; // 초기 포인트 값

export const orderHandlers = [
  // 주문 생성 핸들러
  rest.post("/api/orders", (req, res, ctx) => {
    const newOrder = req.body as OrderFormData;

    // 유효성 검사
    if (
      !newOrder.productId ||
      !newOrder.optionId ||
      !newOrder.quantity ||
      newOrder.point === undefined
    ) {
      return res(ctx.status(400), ctx.json({ message: "Invalid input" }));
    }

    // 사용 포인트 유효성 검사
    if (newOrder.point > userPoints) {
      return res(ctx.status(400), ctx.json({ message: "Insufficient points" }));
    }

    // productId로 상품 정보 찾기
    const product = PRODUCTS_MOCK_DATA.content.find(
      (p) => p.id === newOrder.productId
    );

    if (!product) {
      return res(ctx.status(404), ctx.json({ message: "Product not found" }));
    }

    // 주문 생성 로직
    const orderPrice = product.price * newOrder.quantity;
    const finalPrice = orderPrice - newOrder.point;
    const earnedPoints = finalPrice * 0.05;

    const createdOrder: Order = {
      id: nextOrderId++, // 고유 ID 할당
      productName: product.name,
      optionName: "기본 옵션", // 예시로 기본 옵션으로 설정
      price: finalPrice, // 수량에 따른 가격에서 포인트 차감
      date: new Date().toISOString(),
      imageUrl: product.imageUrl,
      ...newOrder,
    };

    // 포인트 차감 및 적립
    userPoints -= newOrder.point;
    userPoints += earnedPoints;

    // 데이터베이스에 저장
    ordersDatabase.push(createdOrder);
    console.log("Created Order:", createdOrder);

    return res(ctx.status(200), ctx.json(createdOrder));
  }),

  // 주문 목록 불러오기 핸들러
  rest.get("/api/orders", (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get("page") || "0");
    const size = parseInt(req.url.searchParams.get("size") || "10");
    const totalElements = ordersDatabase.length;
    const totalPages = Math.ceil(totalElements / size);

    const start = page * size;
    const end = start + size;
    const orders = ordersDatabase.slice(start, end).map((order) => ({
      orderId: order.id,
      productId: order.productId,
      productName: order.productName,
      optionName: order.optionName,
      quantity: order.quantity,
      date: order.date,
      price: order.price,
      imageUrl: order.imageUrl,
    }));

    return res(
      ctx.status(200),
      ctx.json({
        hasNext: page < totalPages - 1,
        orders,
      })
    );
  }),

  // 보유 포인트 조회 핸들러
  rest.get("/api/points", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        points: userPoints,
      })
    );
  }),
];
