import axios from 'axios';
import { useEffect, useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';
import type { ProductData } from '@/types';

export type ProductDetailRequestParams = {
  productId: string;
};

type Props = ProductDetailRequestParams;

export type GoodsDetailResponseData = ProductData;

export const useGetProductDetail = ({ productId }: Props) => {
  const { baseURL } = useBaseURL();
  const [data, setData] = useState<GoodsDetailResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProductDetailPath = `${baseURL}/api/products/${productId}`;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<GoodsDetailResponseData>(getProductDetailPath);
        setData(response.data);
      } catch (err) {
        let errorMessage = 'An unexpected error occurred';
        if (axios.isAxiosError(err) && err.response) {
          errorMessage = (err.response.data.detail as string) || 'Failed to fetch categories';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL, productId]); // 종속성 배열에 baseURL과 productId를 추가

  return { data, loading, error };
};