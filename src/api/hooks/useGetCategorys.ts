import { useMutation, useQuery } from "@tanstack/react-query";

import type { CategoryData } from "@/types";

import { BASE_URL, fetchInstance } from "../instance";

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });

export type AddCategoryRequestData = Omit<CategoryData, "id">;

const addCategoryPath = () => `${BASE_URL}/api/categories`;

const addCategory = async (categoryData: AddCategoryRequestData) => {
  const response = await fetchInstance.post(addCategoryPath(), categoryData);
  return response.data;
};

export const useAddCategory = () =>
  useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      console.log("Category added successfully:", data);
    },
    onError: (error) => {
      console.error("Error adding category:", error);
    },
  });
