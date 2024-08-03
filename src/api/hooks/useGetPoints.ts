import { useEffect, useState } from 'react';

import { fetchInstance } from '../instance';

export const useGetPoints = () => {
  const [points, setPoints] = useState(() => {
    const savedPoints = sessionStorage.getItem('points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  useEffect(() => {
    if (!sessionStorage.getItem('points')) {
      const fetchPoints = async () => {
        try {
          const response = await fetchInstance.get('/api/member/point');
          setPoints(response.data.point);
          sessionStorage.setItem('points', response.data.point);
        } catch (error) {
          console.error('Failed to fetch points', error);
        }
      };
      fetchPoints();
    }
  }, []);

  return points;
};
