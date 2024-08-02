// import { useSuspenseQuery } from '@tanstack/react-query';

// import type { ProductOptionsData } from '@/types';

// import { BASE_URL, fetchInstance } from '../instance';
// import type { ProductDetailRequestParams } from './useGetProductDetail';

// type Props = ProductDetailRequestParams;

// export type ProductOptionsResponseData = ProductOptionsData[];

// // export const getProductOptionsPath = (productId: string) =>
// //   `${BASE_URL}/api/products/${productId}/options`;

// // export const getProductOptions = async (params: ProductDetailRequestParams) => {
// //   const response = await fetchInstance.get<ProductOptionsResponseData>(
// //     getProductOptionsPath(params.productId),
// //   );
// //   return response.data;
// // };

// export const useGetProductOptions = ({ productId }: Props) => {

//   // return useSuspenseQuery({
//   //   queryKey: [getProductOptionsPath(productId)],
//   //   queryFn: () => getProductOptions({ productId }),
//   // });
// };

import axios from 'axios';
import { useEffect, useState } from 'react';

import { useBaseURL } from '@/provider/Auth/BaseUrlContext';
// import type { ProductOptionsData } from '@/types';
import type { ProductOptionsDatas } from '@/types';

type Props = { productId: string };

export type ProductOptionsResponseData = ProductOptionsDatas;

export const useGetProductOptions = ({ productId }: Props) => {
  const { baseURL } = useBaseURL();
  const [data, setData] = useState<ProductOptionsResponseData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ProductOptionsResponseData>(
          `${baseURL}/api/products/${productId}/options`
        );
        setData(response.data);
      } catch (err) {
        let errorMessage = 'An unexpected error occurred';
        if (axios.isAxiosError(err) && err.response) {
          errorMessage = (err.response.data.detail as string) || 'Failed to fetch product options';
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [baseURL, productId]);

  return { data, loading, error };
};
