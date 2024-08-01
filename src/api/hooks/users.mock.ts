import { rest } from 'msw';

import { BASE_URL } from '../instance';
import { getUserPath, getUsersPath } from './useGetUser';

export const usersMockHandler = [
  rest.post(getUsersPath(BASE_URL), async (req, res, ctx) => {
    try{
        const { email, password } = await req.json();
        if (!email || !password) {
            return await res(ctx.status(400));
        }
        usersMockData.push({ email, password, token: email+'token' });
        return await res(ctx.status(201));
    } catch (error) {
        return res(ctx.status(400));
    }
  }),
  rest.post(getUserPath(BASE_URL), async (req, res, ctx) => {
    try {
      const { email, password } = await req.json();
      if (!email || !password) {
        return await res(ctx.status(400));
      }

      const result = usersMockData.find((user) => user.email === email);

      if (result && result.password === password) {
        return await res(
          ctx.status(200), ctx.set('token', result.token)
        );
      } else {
        return await res(ctx.status(404));
      }
    } catch (error) {
      return res(ctx.status(400));
    }
  }),
];

const usersMockData = [{
  email: 'testUser@test.com',
  password: '0',
  token: 'testUser@test.comtoken',
}];