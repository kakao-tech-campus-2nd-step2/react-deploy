import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import { fetchInstance } from '../instance'; 

interface Wish {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<null | string>(null);

  const fetchWishlist = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('인증 토큰이 없습니다');
    }
      setLoading(true);
      const response = await fetchInstance.get(
        '/api/wishes?page=0&size=10&sort=createdDate,desc'
      );
      console.log('위시리스트 fetch response', response.data);
      setWishlist(response.data.content);

      
    } catch (error) {
      if (error instanceof AxiosError) {
        setFetchError(error.message || 'An error occurred');
      } else {
        setFetchError('An unexpected error occurred');
      }
      console.error('위시 리스트 fetch 에러', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return { wishlist, loading, fetchError, fetchWishlist };
};

export const useAddToWishlist = (fetchWishlist: () => void) => {
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState<null | string>(null);

  const addToWishlist = async (optionId: number, quantity: number) => {
    try {
      setLoading(true);
      const response = await fetchInstance.post('/api/wishes', { optionId, quantity });
      console.log('위시리스트 response add', response.data);
      await fetchWishlist();
    } catch (error) {
      if (error instanceof AxiosError) {
        setAddError(error.message || 'An error occurred');
      } else {
        setAddError('An unexpected error occurred');
      }
      console.error('위시리스트 에러 add', error);
    } finally {
      setLoading(false);
    }
  };

  return { addToWishlist, loading, addError };
};

export const useRemoveFromWishlist = (fetchWishlist: () => void) => {
  const [loading, setLoading] = useState(false);
  const [removeError, setRemoveError] = useState<null | string>(null);

  const removeFromWishlist = async (wishId: number) => {
    try {
      setLoading(true);
      await fetchInstance.delete(`/api/wishes/${wishId}`);
      await fetchWishlist();
    } catch (error) {
      if (error instanceof AxiosError) {
        setRemoveError(error.message || 'An error occurred');
      } else {
        setRemoveError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { removeFromWishlist, loading, removeError };
};
