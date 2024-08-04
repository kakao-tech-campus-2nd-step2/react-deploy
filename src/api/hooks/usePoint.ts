import { useQuery } from "@tanstack/react-query";

import { BASE_URL, fetchInstance } from "../instance";

export type GetPointsResponse = {
  point: number;
};

const pointPath = `${BASE_URL}/api/points`;

const getPoints = async (): Promise<GetPointsResponse> => {
  const response = await fetchInstance.get<GetPointsResponse>(pointPath);
  return response.data;
};

export const useGetPoints = () => {
  return useQuery<GetPointsResponse, Error>({
    queryKey: ["points"],
    queryFn: getPoints,
  });
};
