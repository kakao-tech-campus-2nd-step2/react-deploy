import { RankingProductsRequest } from '@internalTypes/requestTypes';
import { RankingProductsResponse } from '@internalTypes/responseTypes';
import { RANKING_PATHS } from '@apis/path';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { initInstance } from '@apis/instance';
import { useAPI } from '@/context/api/useAPI';

const getRankingProducts = async (
  baseURL: string,
  params?: RankingProductsRequest,
): Promise<RankingProductsResponse> => {
  const instance = initInstance(baseURL);
  const res = await instance.get<RankingProductsResponse>(RANKING_PATHS.PRODUCTS, { params });
  return res.data;
};

export const useGetRankingProducts = (
  params: RankingProductsRequest,
): UseQueryResult<RankingProductsResponse, AxiosError> => {
  const { baseURL } = useAPI();

  return useQuery<RankingProductsResponse, AxiosError>({
    queryKey: ['rankingProducts', params],
    queryFn: () => getRankingProducts(baseURL, params),
  });
};
