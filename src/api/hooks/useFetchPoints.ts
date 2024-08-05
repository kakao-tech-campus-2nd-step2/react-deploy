// src/api/hooks/useFetchPoints.ts
import { useState, useEffect } from 'react';
import { fetchInstance } from '@/api/instance';
import { BASE_URL } from '@/api/instance';
export const useFetchPoints = (token: string) => {
  const [points, setPoints] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await fetchInstance.get<{ point: number }>(`${BASE_URL}/api/members/points`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPoints(response.data.point);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [token]);

  return { points, loading, error };
};
