import { rest } from 'msw';
import { WISH_PATHS } from '@apis/path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const wishMockHandler = [
  rest.get(`${BASE_URL}${WISH_PATHS.GET_WISH({ page: 0, size: 10, sort: 'createdDate,desc' })}`, (_, res, ctx) =>
    res(ctx.json(WISHES_MOCK_DATA)),
  ),
  rest.post(`${BASE_URL}${WISH_PATHS.ADD_WISH}`, (req, res, ctx) => {
    const maxWishId = Math.max(...WISHES_MOCK_DATA.content.map((item) => item.wishId), 0);
    const maxProductId = Math.max(...WISHES_MOCK_DATA.content.map((item) => item.productId), 0);
    const newWishId = maxWishId + 1;
    const newProductId = maxProductId + 1;

    WISHES_MOCK_DATA = {
      ...WISHES_MOCK_DATA,
      content: [
        ...WISHES_MOCK_DATA.content,
        {
          wishId: newWishId,
          productId: newProductId,
          productName: '새 상품 이름',
          productPrice: 3000,
          productImageUrl: 'https://example.com/image3.jpg',
          category: {
            id: 3,
            name: '새 카테고리 이름',
            imageUrl: 'https://example.com/category3.jpg',
            description: '새 카테고리 설명',
          },
        },
      ],
      totalElements: WISHES_MOCK_DATA.totalElements + 1,
    };
    return res(ctx.status(200), ctx.json({ wishId: newWishId }));
  }),
  rest.delete(`${BASE_URL}${WISH_PATHS.DELETE_WISH}/:wishId`, (req, res, ctx) => {
    const wishIdParam = req.params.wishId;
    const wishId = Array.isArray(wishIdParam) ? wishIdParam[0] : wishIdParam;
    const wishIdNumber = parseInt(wishId, 10);

    WISHES_MOCK_DATA = {
      ...WISHES_MOCK_DATA,
      content: WISHES_MOCK_DATA.content.filter((item) => item.wishId !== wishIdNumber),
      totalElements: WISHES_MOCK_DATA.totalElements - 1,
    };
    return res(ctx.status(200));
  }),
];

let WISHES_MOCK_DATA = {
  totalPages: 1,
  totalElements: 2,
  size: 2,
  content: [
    {
      wishId: 1,
      productId: 1,
      productName: '상품 이름 1',
      productPrice: 1000,
      productImageUrl: 'https://example.com/image1.jpg',
      category: {
        id: 1,
        name: '카테고리 이름 1',
        imageUrl: 'https://example.com/category1.jpg',
        description: '카테고리 설명 1',
      },
    },
    {
      wishId: 2,
      productId: 2,
      productName: '상품 이름 2',
      productPrice: 2000,
      productImageUrl: 'https://example.com/image2.jpg',
      category: {
        id: 2,
        name: '카테고리 이름 2',
        imageUrl: 'https://example.com/category2.jpg',
        description: '카테고리 설명 2',
      },
    },
  ],
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  last: true,
  numberOfElements: 2,
  pageable: {
    offset: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    paged: true,
    pageSize: 2,
    pageNumber: 0,
    unpaged: false,
  },
  empty: false,
};
