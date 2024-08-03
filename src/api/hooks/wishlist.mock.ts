import { rest } from 'msw';

interface WishlistItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

const getPagedData = (page: number, size: number) => {
  const start = page * size;
  const end = start + size;
  return WISHLIST_MOCK_DATA.content.slice(start, end);
};

export const wishlistMockHandler = [
  rest.get(`/api/wishes`, async (req, res, ctx) => {
    const token = req.headers.get('Authorization');

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '10', 10);

    const pagedContent = getPagedData(page, size);
    const totalElements = WISHLIST_MOCK_DATA.content.length;
    const totalPages = Math.ceil(totalElements / size);

    return res(
      ctx.status(200),
      ctx.json({
        content: pagedContent.map((item) => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        })),
        pageable: {
          sort: {
            sorted: true,
            unsorted: false,
            empty: false,
          },
          pageNumber: page,
          pageSize: size,
          offset: page * size,
          unpaged: false,
          paged: true,
        },
        totalPages,
        totalElements,
        last: page + 1 === totalPages,
        number: page,
        size: size,
        numberOfElements: pagedContent.length,
        first: page === 0,
        empty: pagedContent.length === 0,
      }),
    );
  }),
  rest.delete(`/api/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    const wishIndex = WISHLIST_MOCK_DATA.content.findIndex((item) => item.id === Number(wishId));
    if (wishIndex !== -1) {
      WISHLIST_MOCK_DATA.content.splice(wishIndex, 1);
      return res(ctx.status(204));
    }
    return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
  }),
  rest.post(`/api/wishes/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const token = req.headers.get('Authorization');

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    const existingWish = WISHLIST_MOCK_DATA.content.find(
      (item) => item.product.id === Number(productId),
    );

    if (existingWish) {
      return res(ctx.status(400), ctx.json({ message: 'Product already in wishlist' }));
    }

    const newProduct = {
      id: WISHLIST_MOCK_DATA.content.length + 1,
      product: {
        id: Number(productId),
        name: `Product ${String.fromCharCode(65 + WISHLIST_MOCK_DATA.content.length)}`,
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    };

    WISHLIST_MOCK_DATA.content.push(newProduct);

    return res(ctx.status(201), ctx.json(newProduct));
  }),
];

interface WishlistMockData {
  content: WishlistItem[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

const WISHLIST_MOCK_DATA: WishlistMockData = {
  content: [
    {
      id: 1,
      product: {
        id: 1,
        name: 'Product A',
        price: 100,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 2,
      product: {
        id: 2,
        name: 'Product B',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 3,
      product: {
        id: 3,
        name: 'Product C',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 4,
      product: {
        id: 4,
        name: 'Product D',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 5,
      product: {
        id: 5,
        name: 'Product E',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 6,
      product: {
        id: 6,
        name: 'Product F',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 7,
      product: {
        id: 7,
        name: 'Product G',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 8,
      product: {
        id: 8,
        name: 'Product H',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 9,
      product: {
        id: 9,
        name: 'Product I',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 10,
      product: {
        id: 10,
        name: 'Product J',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
    {
      id: 11,
      product: {
        id: 11,
        name: 'Product K',
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    },
  ],
  pageable: {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
    },
    pageNumber: 0,
    pageSize: 10,
    offset: 0,
    unpaged: false,
    paged: true,
  },
  totalPages: 5,
  totalElements: 50,
  last: false,
  number: 0,
  size: 10,
  numberOfElements: 2,
  first: true,
  empty: false,
};
