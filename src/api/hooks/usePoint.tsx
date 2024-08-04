import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { BASE_URL } from '../../api/instance'; 

export const usePoint = () => {
  const [point, setPoint] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoint = async () => {
    try {
      setLoading(true);
      const authToken = localStorage.getItem('authToken');
      console.log('Using BASE_URL:', BASE_URL); // BASE_URL 확인
      console.log('Auth Token:', authToken); // 토큰 확인

      const response = await axios.get(`${BASE_URL}/api/points`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      
      console.log('Response:', response.data); // 응답 데이터 확인
      setPoint(response.data); // API 명세에 따라 response.data.point로 설정
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message || '포인트를 가져오는데 실패했습니다');
      } else {
        setError('예상치 못한 오류가 발생했습니다');
      }
      console.error('포인트 가져오기 에러', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPoint();
  }, []);

  return { point, loading, error, fetchPoint };
}
