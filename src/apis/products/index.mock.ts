import { rest } from 'msw';
import { PRODUCTS_PATHS } from '@apis/path';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const productsMockHandler = [
  rest.get(
    `${BASE_URL}${PRODUCTS_PATHS.PRODUCTS({ page: 0, sort: 'name,asc', size: 10, categoryId: 2 })}`,
    (_, res, ctx) => res(ctx.json(PRODUCTS_MOCK_DATA)),
  ),
  rest.get(`${BASE_URL}${PRODUCTS_PATHS.PRODUCTS_DETAIL(':productId')}`, (req, res, ctx) => {
    const { productId } = req.params;
    if (productId === '3245119') {
      return res(ctx.json(PRODUCTS_MOCK_DATA));
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),
  rest.get(`${BASE_URL}${PRODUCTS_PATHS.PRODUCTS_OPTIONS(':productId')}`, (req, res, ctx) => {
    const { productId } = req.params;
    if (productId === '3245119') {
      return res(
        ctx.json({
          options: {
            giftOrderLimit: 100,
          },
        }),
      );
    }
    return res(ctx.status(404), ctx.json({ message: 'Product not found' }));
  }),
];

const PRODUCTS_MOCK_DATA = {
  totalPages: 0,
  totalElements: 0,
  size: 0,
  content: [
    {
      id: 3245119,
      name: '[단독각인] 피렌체 1221 에디션 오드코롱 50ml (13종 택1)',
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
      price: 145000,
      category: {
        id: 3245119,
        name: '카테고리 이름',
        imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215083306_8e1db057580145829542463a84971ae3.png',
        description: '설명',
      },
    },
    {
      id: 2263833,
      name: '외식 통합권 10만원권',
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
      price: 100000,
      category: {
        id: 1,
        name: '카테고리 이름',
        imageUrl: 'https://st.kakaocdn.net/product/gift/product/20200513102805_4867c1e4a7ae43b5825e9ae14e2830e3.png',
        description: '설명',
      },
    },
    {
      id: 6502823,
      name: '[선물포장/미니퍼퓸증정] 디켄터 리드 디퓨저 300ml + 메세지카드',
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
      price: 108000,
      category: {
        id: 6502823,
        name: '카테고리 이름',
        imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240215112140_11f857e972bc4de6ac1d2f1af47ce182.jpg',
        description: '설명',
      },
    },
    {
      id: 1181831,
      name: '[선물포장] 소바쥬 오 드 뚜왈렛 60ML',
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
      price: 122000,
      category: {
        id: 1181831,
        name: '카테고리 이름',
        imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240214150740_ad25267defa64912a7c030a7b57dc090.jpg',
        description: '설명',
      },
    },
    {
      id: 1379982,
      name: '[정관장] 홍삼정 에브리타임 리미티드 (10ml x 30포)',
      imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
      price: 133000,
      category: {
        id: 1379982,
        name: '카테고리 이름',
        imageUrl: 'https://st.kakaocdn.net/product/gift/product/20240118135914_a6e1a7442ea04aa49add5e02ed62b4c3.jpg',
        description: '설명',
      },
    },
  ],
  number: 0,
  sort: {
    empty: true,
    sorted: true,
    unsorted: true,
  },
  first: true,
  last: true,
  numberOfElements: 0,
  pageable: {
    offset: 0,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    paged: true,
    pageSize: 0,
    pageNumber: 0,
    unpaged: true,
  },
  empty: true,
};
