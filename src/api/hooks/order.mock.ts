import { rest } from "msw";

import { PRODUCTS_MOCK_DATA } from "./products.mock";

interface OrderFormData {
  productId: number;
  optionId?: number;
  productQuantity: number;
  messageCardTextMessage: string;
  senderId?: number;
  receiverId?: number;
  hasCashReceipt: boolean;
  cashReceiptType?: 'PERSONAL' | 'BUSINESS';
  cashReceiptNumber?: string
  point?: number;
};

interface Order extends OrderFormData {
  id: number;
  productName: string;
  optionName: string;
  price: number;
  date: string;
  imageUrl: string;
}

let nextOrderId = 1;
let userPoints = 10000;
const ordersDatabase: Order[] = [];

export const orderHandlers = [
  rest.post("/api/orders", (req, res, ctx) => {
    const newOrder = req.body as OrderFormData;

    if (
      !newOrder.productId ||
      !newOrder.optionId ||
      !newOrder.productQuantity ||
      newOrder.point === undefined
    ) {
      return res(ctx.status(400), ctx.json({ message: "Invalid input" }));
    }

    if (newOrder.point > userPoints) {
      return res(ctx.status(400), ctx.json({ message: "Insufficient points" }));
    }
    const product = PRODUCTS_MOCK_DATA.content.find(
      (p) => p.id === newOrder.productId
    );

    if (!product) {
      return res(ctx.status(404), ctx.json({ message: "Product not found" }));
    }

    const orderPrice = product.price * newOrder.productQuantity;
    const finalPrice = orderPrice - newOrder.point;
    const earnedPoints = finalPrice * 0.05;

    const createdOrder: Order = {
      id: nextOrderId++,
      productName: product.name,
      optionName: "Option A", // 임시 데이터
      price: finalPrice,
      date: new Date().toISOString(),
      imageUrl: product.imageUrl,
      ...newOrder,
    };
    
    userPoints -= newOrder.point;
    userPoints += earnedPoints;

    ordersDatabase.push(createdOrder);
    console.log("Created Order:", createdOrder);

    return res(ctx.status(200), ctx.json(createdOrder));
  }),

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
      quantity: order.productQuantity,
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

  rest.get("/api/points", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        points: userPoints,
      })
    );
  }),

  rest.post("/api/points", (req, res, ctx) => {
    const { pointsToAdd } = req.body as { pointsToAdd: number };

    if (pointsToAdd <= 0) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Invalid points value" })
      );
    }

    userPoints += pointsToAdd;

    return res(
      ctx.status(200),
      ctx.json({
        message: "Points added successfully",
        points: userPoints,
      })
    );
  }),
];