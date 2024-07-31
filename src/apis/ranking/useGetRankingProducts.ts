import { RankingProductsRequest } from '@internalTypes/requestTypes';
import { RankingProductsResponse } from '@internalTypes/responseTypes';
import { RANKING_PATHS } from '@apis/path';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import axiosInstance from '../instance';

const getRankingProducts = async (params?: RankingProductsRequest): Promise<RankingProductsResponse> => {
  const res = await axiosInstance.get<RankingProductsResponse>(RANKING_PATHS.PRODUCTS, { params });
  return res.data;
};

export const useGetRankingProducts = (
  params: RankingProductsRequest,
): UseQueryResult<RankingProductsResponse, AxiosError> =>
  useQuery<RankingProductsResponse, AxiosError>({
    queryKey: ['rankingProducts', params],
    queryFn: () => getRankingProducts(params),
  });
