import { useQuery } from "@tanstack/react-query";

import type { CategoryData } from "@/types";

import { BASE_URL, fetchInstance } from "../instance";

export type CategoryResponseData = {
  data: CategoryData[];
};

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response =
    await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  console.log(response.data);
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
