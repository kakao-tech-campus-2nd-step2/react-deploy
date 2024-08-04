import { rest } from 'msw';

import { BASE_URL } from '../instance';
import { PRODUCTS_MOCK_DATA } from './products.mock';
import { deleteWishlistPath, getWishlistPath, postWishlistPath, type WishData } from './useGetWishlist';

export const wishlistMockHandler = [
    rest.post(postWishlistPath(BASE_URL), async (req, res, ctx) => {
        const { productId } = await req.json();
        const authToken = req.headers.get('Authorization')?.split(' ')[1];
        if(!productId || !authToken) {
            return res(ctx.status(400));
        }
        const product: WishData["product"] | undefined= PRODUCTS_MOCK_DATA.content.find((_product) => _product.id === productId);
        if (!product) {
            return res(ctx.status(400));
        }
        wishlistMockData.push({
            id: wishlistMockData.length + 1,
            product,
            createdDate: new Date(Date.now()), 
            user: authToken
        });

        return res(ctx.status(201));
    }),
    rest.delete(deleteWishlistPath(':wishId', BASE_URL), (req, res, ctx) => {
        const { wishId } = req.params;

        const index = wishlistMockData.findIndex((wish) => wish.id === Number(wishId));
        if (index === -1) {
            return res(ctx.status(404));
        }

        wishlistMockData.splice(index, 1);
        return res(ctx.status(204));
    }),
    rest.get(getWishlistPath({}, BASE_URL), (req, res, ctx) => {
        const url = new URL(req.url);
        const authToken = req.headers.get('Authorization')?.split(' ')[1];
        const page = url.searchParams.get('page');
        const size = url.searchParams.get('size');
        const sort = url.searchParams.get('sort');

        const result = wishlistMockData.filter((wish) => wish.user === authToken)
        if(page && size)
            result.slice(Number(page) * Number(size), Number(page) * Number(size) + Number(size));
        if(sort){
            // TODO: sort 키워드 확인 후 정렬 로직 추가
            const [ key, order ] = sort.split(',');
            if(key === 'createdDate')
                result.sort((a, b) => {
                    if(order === 'asc')
                        return a.createdDate.getTime() - b.createdDate.getTime();
                    else
                        return b.createdDate.getTime() - a.createdDate.getTime();
                });
        }

        return res(ctx.json({content: result}));
    }),
];


const wishlistMockData: (WishData & {user: string})[] = [{
    id: 1,
    product: PRODUCTS_MOCK_DATA.content[0],
    createdDate: new Date('2021-09-01'), 
    user: 'testUser@test.comtoken',
}]