import { rest } from 'msw';

import { type InterestItem } from '@/types';

import { BASE_URL } from '../instance';

const interestDatabase: InterestItem[] = [];
let nextId = 1;

export const interestHandlers = [
  // 관심 상품 목록에 등록
  rest.post(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
    const newInterest = req.body as InterestItem;

    if (!newInterest.productId) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    // 새로운 관심 등록
    newInterest.productId = nextId++;
    interestDatabase.push(newInterest);

    return res(ctx.status(201), ctx.json(newInterest));
  }),

  // 관심 상품 목록 조회
  rest.get(`${BASE_URL}/api/wishes`, (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0');
    const size = parseInt(req.url.searchParams.get('size') || '10');
    const totalItems = interestDatabase.length;
    const totalPages = Math.ceil(totalItems / size);

    const start = page * size;
    const end = start + size;
    const content = interestDatabase.slice(start, end);

    return res(
      ctx.status(200),
      ctx.json({
        content,
        totalPages,
        totalItems,
        size,
        number: page,
        first: page === 0,
        last: page === totalPages - 1,
        numberOfItems: content.length,
        empty: content.length === 0,
      }),
    );
  }),

  // 관심 상품 목록에서 삭제
  rest.delete(`${BASE_URL}/api/wishes:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const interestIndex = interestDatabase.findIndex((interest) => interest.productId === Number(productId));

    if (interestIndex === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Interest Not found' }));
    }
    
    interestDatabase.splice(interestIndex, 1);
    return res(ctx.status(204));
  })
];