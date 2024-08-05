import { rest } from 'msw';

import { getProductDetailPath } from './useGetProductDetail';
import { getProductOptionsPath } from './useGetProductOptions';
import { getProductsPath } from './useGetProducts';

export const productsMockHandler = [
  rest.get(
    getProductsPath({
      categoryId: '1',
    }),
    (_, res, ctx) => {
      return res(ctx.json(PRODUCTS_MOCK_DATA));
    },
  ),
  rest.get(getProductDetailPath(':productId'), (req, res, ctx) => {
    const { productId } = req.params;
    const product = PRODUCTS_MOCK_DATA.content.find((p) => p.id === Number(productId));
    if (product) {
      return res(ctx.json(product));
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
    }
  }),
  rest.get(getProductOptionsPath(':productId'), (_, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          name: 'Option A',
          quantity: 10,
          productId: 1,
        },
        {
          id: 2,
          name: 'Option B',
          quantity: 20,
          productId: 1,
        },
      ]),
    );
  }),
];

const PRODUCTS_MOCK_DATA = {
  totalPages: 1,
  totalElements: 3,
  first: true,
  last: true,
  size: 20,
  content: [
    {
      id: 3245119,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      price: 145000,
      categoryId: 2920,
      optionId: [101, 102],
    },
    {
      id: 2263833,
      name: '외식 통합권 10만원권',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
      price: 100000,
      categoryId: 2920,
      optionId: [103, 104],
    },
    {
      id: 6502823,
      name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
      price: 108000,
      categoryId: 2930,
      optionsId: [105, 106],
    },
    {
      id: 1181831,
      name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
      price: 122000,
      categoryId: 2930,
      optionsId: [107, 108],
    },
    {
      id: 1379982,
      name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
      imageUrl:
        'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
      price: 133000,
      categoryId: 2930,
      optionsId: [109, 110],
    },
  ],
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements: 3,
  pageable: {
    pageNumber: 0,
    pageSize: 20,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    paged: true,
    unpaged: false,
  },
  empty: false,
};
