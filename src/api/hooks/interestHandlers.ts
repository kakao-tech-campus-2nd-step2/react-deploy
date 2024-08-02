import { rest } from 'msw';

const wishesDatabase: {
  id: number;
  product: { id: number; name: string; price: number; imageUrl: string };
}[] = [];
let nextId = 1;

export const interestHandlers = [
  //관심 목록 추가
  rest.post('/api/wishes', async (req, res, ctx) => {
    const { product } = req.body as {
      product: { id: number; name: string; price: number; imageUrl: string };
    };

    //유효성 검사
    if (!product) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid input' }));
    }

    try {
      console.log('POST /api/wishes request:', product);
      const newWish = { id: nextId++, product }; //새로운 위시 추가
      wishesDatabase.push(newWish);

      console.log('Current wishesDatabase:', wishesDatabase);
      return await res(ctx.status(201), ctx.json(newWish));
    } catch (error) {
      console.error('POST /api/wishes error:', error);
      return res(ctx.status(500), ctx.json({ message: 'Failed to add wish item' }));
    }
  }),

  rest.get('/api/wishes', (req, res, ctx) => {
    //관심 목록 리스트 불러오기
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '10', 10);
    const totalElements = wishesDatabase.length;
    const totalPages = Math.ceil(totalElements / size);

    const start = page * size;
    const end = start + size;
    const content = wishesDatabase.slice(start, end);

    console.log('GET /api/wishes response:', {
      content,
      pageable: {
        sort: { sorted: true, unsorted: false, empty: false },
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
    });

    return res(
      ctx.status(200),
      ctx.json({
        content,
        pageable: {
          sort: { sorted: true, unsorted: false, empty: false },
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
      }),
    );
  }),

  // 위시 삭제 핸들러 추가
  rest.delete('/api/wishes/:wishId', async (req, res, ctx) => {
    const { wishId } = req.params;
    const id = Array.isArray(wishId) ? wishId[0] : wishId;
    const index = wishesDatabase.findIndex((wish) => wish.id === parseInt(id as string, 10));

    if (index !== -1) {
      wishesDatabase.splice(index, 1); // 위시 삭제
      return res(ctx.status(204)); // 성공 응답
    } else {
      return res(ctx.status(404), ctx.json({ message: 'Item not found' }));
    }
  }),
];
