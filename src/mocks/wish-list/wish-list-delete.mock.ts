import { rest } from 'msw';

import { BASE_URL } from '@/api/instance';

import { getMockData, updateMockData } from '../mockData';

export const DeleteWishListMockHandler = [
  rest.delete(`${BASE_URL}/api/wishes/:wishId`, (req, res, ctx) => {
    const { wishId } = req.params;
    const wishIdNumber = typeof wishId === 'string' ? parseInt(wishId, 10) : undefined;

    if (wishIdNumber === undefined || isNaN(wishIdNumber)) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid wishId' }));
    }

    const mockData = getMockData();
    const updatedContent = mockData.content.filter((item) => item.id !== wishIdNumber);

    updateMockData({
      ...mockData,
      content: updatedContent,
    });

    return res(ctx.status(200), ctx.json({ message: 'Item successfully deleted' }));
  }),
];
