import { rest } from 'msw';

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

type WishlistItem = {
  id: number;
  product: Product;
}

type PageableResponse<T> = {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

const WISHLIST_MOCK_DATA: WishlistItem[] = [
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
];

const getPagedData = (page: number, size: number) => {
  const start = page * size;
  const end = start + size;
  return WISHLIST_MOCK_DATA.slice(start, end);
};

export const wishlistMockHandler = [
  rest.get<PageableResponse<WishlistItem>>('/api/wishes', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '10', 10);

    const pagedContent = getPagedData(page, size);
    const totalElements = WISHLIST_MOCK_DATA.length;
    const totalPages = Math.ceil(totalElements / size);

    return res(
      ctx.status(200),
      ctx.json({
        content: pagedContent.map(item => ({
          id: item.id,
          name: item.product.name,
          price: item.product.price,
          imageUrl: item.product.imageUrl,
        })),
        totalPages: totalPages,
        totalElements: totalElements,
        number: page,
        size: size,
        first: page === 0,
        last: page === totalPages - 1,
      })
    );
  }),
  rest.delete('/api/wishes/:wishId', (req, res, ctx) => {
    const { wishId } = req.params;
    const index = WISHLIST_MOCK_DATA.findIndex(item => item.id.toString() === wishId);

    if (index === -1) {
      return res(ctx.status(404), ctx.json({ message: 'Wish not found' }));
    }

    WISHLIST_MOCK_DATA.splice(index, 1);
    return res(ctx.status(204));
  }),
  rest.post(`/api/wishes/:productId`, (req, res, ctx) => {
    const { productId } = req.params;
    const token = req.headers.get('Authorization');

    if (!token) {
      return res(ctx.status(401), ctx.json({ message: 'Invalid or missing token' }));
    }

    const existingWish = WISHLIST_MOCK_DATA.find(
      (item) => item.product.id === Number(productId),
    );

    if (existingWish) {
      return res(ctx.status(400), ctx.json({ message: 'Product already in wishlist' }));
    }

    const newProduct = {
      id: WISHLIST_MOCK_DATA.length + 1,
      product: {
        id: Number(productId),
        name: `Product ${String.fromCharCode(65 + WISHLIST_MOCK_DATA.length)}`,
        price: 150,
        imageUrl:
          'https://img1.daumcdn.net/thumb/S104x104/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fgift%2Fhome%2Ftheme%2F292020231106_MXMUB.png',
      },
    };

    WISHLIST_MOCK_DATA.push(newProduct);

    return res(ctx.status(201), ctx.json(newProduct));
  }),
];
