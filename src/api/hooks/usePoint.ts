//import { AxiosError } from 'axios';
//import { useEffect, useState } from 'react';
import { rest } from 'msw';
import { useQuery } from 'react-query';

import { BASE_URL, fetchInstance } from '../instance';

// 임의로 정의한 사용자 포인트
let userPoints = 10000;

//통신할때
// export const usePoint = () => {
//   const [point, setPoint] = useState<number | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchPoint = async () => {
//     try {
//       setLoading(true);
//       console.log('Using BASE_URL:', BASE_URL); // BASE_URL 확인

//       const response = await fetchInstance.get(`${BASE_URL}/api/members/me?userId=2`, {});

//       console.log('Response:', response.data); // 응답 데이터 확인
//       setPoint(response.data.remain_point); // API 명세에 따라 response.data.remain_point로 설정
//     } catch (err) {
//       if (err instanceof AxiosError) {
//         setError(err.response?.data.message || '포인트를 가져오는데 실패했습니다');
//       } else {
//         setError('예상치 못한 오류가 발생했습니다');
//       }
//       console.error('포인트 가져오기 에러', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPoint();
//   }, []);

//   return { point, loading, error, fetchPoint };
// };

//로컬에서 돌릴때
export const fetchPoints = async () => {
  const response = await fetchInstance.get(`${BASE_URL}/api/points`);
  return response.data.remain_point;
};

export const usePoint = () => {
  return useQuery('points', fetchPoints);
};

export const pointHandlers = [
  rest.get(`${BASE_URL}/api/points`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        remain_point: userPoints, // remain_point로 반환
      }),
    );
  }),

  rest.post(`${BASE_URL}/api/points`, (req, res, ctx) => {
    const { pointsToAdd } = req.body as { pointsToAdd: number };

    if (pointsToAdd <= 0) {
      return res(ctx.status(400), ctx.json({ message: 'Invalid points value' }));
    }

    userPoints += pointsToAdd;

    return res(
      ctx.status(200),
      ctx.json({
        message: 'Points added successfully',
        remain_point: userPoints,
      }),
    );
  }),
];
